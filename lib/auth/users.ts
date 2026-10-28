// ============================================================
// Email + password accounts, stored in a JSON file until the
// Postgres database is connected (then move this to Prisma).
//
// Passwords are hashed with scrypt and a per-user random salt;
// the plain password is never written anywhere.
// ============================================================

import { randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// Outside public/ and git-ignored; override with USERS_FILE in production.
const USERS_FILE = process.env.USERS_FILE ?? path.join(process.cwd(), ".data", "users.json");

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // "salt:hash", both hex
  createdAt: string;
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await readFile(USERS_FILE, "utf-8")) as StoredUser[];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await mkdir(path.dirname(USERS_FILE), { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
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
