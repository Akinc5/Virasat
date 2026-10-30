// ============================================================
// Virasat data store — tiny document store for the backend.
//
// On Netlify it uses Netlify Blobs (built into every site, no setup
// or external database needed). Everywhere else — local development,
// `next start` — it falls back to JSON files in .data/ (git-ignored).
//
// Each collection is a key → JSON document map. Collections are small
// (users, orders, saved places, outbound clicks), so list() reads all
// documents; move to Postgres via Prisma once volumes grow.
// ============================================================

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export interface Collection<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  list(): Promise<T[]>;
}

type Driver = <T>(name: string) => Collection<T>;

// ── Netlify Blobs ───────────────────────────────────────────
async function netlifyDriver(): Promise<Driver | null> {
  // The Next.js runtime on Netlify provides the Blobs context to functions;
  // getStore() throws when it is missing (e.g. local development).
  try {
    const { getStore } = await import("@netlify/blobs");
    getStore({ name: "virasat-probe" }); // throws if the environment isn't configured
    return <T,>(name: string): Collection<T> => {
      const store = getStore({ name: `virasat-${name}`, consistency: "strong" });
      return {
        async get(key) {
          return ((await store.get(key, { type: "json" })) as T | null) ?? null;
        },
        async set(key, value) {
          await store.setJSON(key, value);
        },
        async delete(key) {
          await store.delete(key);
        },
        async list() {
          const { blobs } = await store.list();
          const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" }) as Promise<T | null>));
          return docs.filter((d): d is NonNullable<typeof d> => d !== null) as T[];
        },
      };
    };
  } catch {
    return null;
  }
}

// ── Local JSON files ────────────────────────────────────────
// Serverless file systems are read-only outside the temp dir
const SERVERLESS = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL);
const DATA_DIR = SERVERLESS ? path.join(tmpdir(), "virasat-data") : path.join(process.cwd(), ".data");
const locks = new Map<string, Promise<unknown>>();

function fileDriver<T>(name: string): Collection<T> {
  const file = path.join(DATA_DIR, `${name}.json`);
  const read = async (): Promise<Record<string, T>> => {
    try {
      return JSON.parse(await readFile(/*turbopackIgnore: true*/ file, "utf-8"));
    } catch {
      return {};
    }
  };
  // Serialise writes per file so concurrent requests can't drop updates
  const mutate = (fn: (all: Record<string, T>) => void) => {
    const prev = locks.get(file) ?? Promise.resolve();
    const next = prev.then(async () => {
      const all = await read();
      fn(all);
      await mkdir(/*turbopackIgnore: true*/ DATA_DIR, { recursive: true });
      await writeFile(/*turbopackIgnore: true*/ file, JSON.stringify(all, null, 2), "utf-8");
    });
    locks.set(file, next.catch(() => undefined));
    return next;
  };
  return {
    async get(key) {
      return (await read())[key] ?? null;
    },
    async set(key, value) {
      await mutate((all) => {
        all[key] = value;
      });
    },
    async delete(key) {
      await mutate((all) => {
        delete all[key];
      });
    },
    async list() {
      return Object.values(await read());
    },
  };
}

let driver: Promise<{ name: "netlify-blobs" | "file"; open: Driver }> | null = null;

function getDriver() {
  driver ??= netlifyDriver().then((d) => (d ? { name: "netlify-blobs" as const, open: d } : { name: "file" as const, open: fileDriver }));
  return driver;
}

/** Which backend is active, and whether a write/read round trip works. */
export async function storeHealth() {
  const { name, open } = await getDriver();
  const probe = open<{ at: string }>("health");
  const at = new Date().toISOString();
  try {
    await probe.set("probe", { at });
    const back = await probe.get("probe");
    return { driver: name, ok: back?.at === at };
  } catch (err) {
    return { driver: name, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Lazily bound collection: picks the driver on first use. */
export function collection<T>(name: string): Collection<T> {
  const bound = getDriver().then((d) => d.open<T>(name));
  return {
    get: async (key) => (await bound).get(key),
    set: async (key, value) => (await bound).set(key, value),
    delete: async (key) => (await bound).delete(key),
    list: async () => (await bound).list(),
  };
}
