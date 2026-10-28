// ============================================================
// Email + password accounts, stored in a JSON file until the
// Postgres database is connected (then move this to Prisma).
//
// Passwords are hashed with scrypt and a per-user random salt;
// the plain password is never written anywhere.
// ============================================================

import { randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { tmpdir } from "node:os";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// Locally: .data/users.json (git-ignored). Serverless hosts such as Netlify
// only allow writes under the temp dir, which is wiped between deploys, so
// accounts there are short-lived until the database is connected.
const SERVERLESS = Boolean(process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const USERS_FILE =
  process.env.USERS_FILE ??
  (SERVERLESS ? path.join(tmpdir(), "virasat-users.json") : path.join(process.cwd(), ".data", "users.json"));

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // "salt:hash", both hex
  createdAt: string;
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await readFile(/*turbopackIgnore: true*/ USERS_FILE, "utf-8")) as StoredUser[];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await mkdir(/*turbopackIgnore: true*/ path.dirname(USERS_FILE), { recursive: true });
  await writeFile(/*turbopackIgnore: true*/ USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

async function passwordMatches(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}

export function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createUser(name: string, email: string, password: string) {
  const users = await readUsers();
  const normalised = normaliseEmail(email);
  if (users.some((u) => u.email === normalised)) {
    throw new Error("EMAIL_TAKEN");
  }
  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: normalised,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  await writeUsers([...users, user]);
  return user;
}

/** Returns the user when the email and password match, otherwise null. */
export async function verifyUser(email: string, password: string) {
  const user = (await readUsers()).find((u) => u.email === normaliseEmail(email));
  if (!user) {
    // Spend the same time hashing so response time doesn't reveal which emails exist
    await hashPassword(password);
    return null;
  }
  return (await passwordMatches(password, user.passwordHash)) ? user : null;
}
