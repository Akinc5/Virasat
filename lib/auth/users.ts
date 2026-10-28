// ============================================================
// Email + password accounts (stored in lib/store).
//
// Passwords are hashed with scrypt and a per-user random salt;
// the plain password is never written anywhere.
//
// Roles: "admin" for emails listed in ADMIN_EMAILS (comma-separated)
// or users an admin has promoted; everyone else is "user".
// ============================================================

import { randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { collection } from "@/lib/store";
import { normaliseEmail, roleFor, type Role } from "@/lib/auth/roles";

export { normaliseEmail, type Role };

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // "salt:hash", both hex
  role: Role;
  createdAt: string;
}

export type PublicUser = Omit<StoredUser, "passwordHash">;

// Keyed by normalised email so sign-in is a single lookup
const users = collection<StoredUser>("users");

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

function toPublic({ passwordHash: _hash, ...user }: StoredUser): PublicUser {
  return { ...user, role: roleFor(user) };
}

export async function createUser(name: string, email: string, password: string) {
  const key = normaliseEmail(email);
  if (await users.get(key)) throw new Error("EMAIL_TAKEN");
  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: key,
    passwordHash: await hashPassword(password),
    role: "user",
    createdAt: new Date().toISOString(),
  };
  await users.set(key, user);
  return toPublic(user);
}

/** Returns the user when the email and password match, otherwise null. */
export async function verifyUser(email: string, password: string) {
  const user = await users.get(normaliseEmail(email));
  if (!user) {
    // Spend the same time hashing so response time doesn't reveal which emails exist
    await hashPassword(password);
    return null;
  }
  return (await passwordMatches(password, user.passwordHash)) ? toPublic(user) : null;
}

export async function listUsers(): Promise<PublicUser[]> {
  return (await users.list()).map(toPublic).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function setUserRole(email: string, role: Role) {
  const key = normaliseEmail(email);
  const user = await users.get(key);
  if (!user) throw new Error("NOT_FOUND");
  await users.set(key, { ...user, role });
}

/** Fresh role from storage (a role change applies before the cookie is renewed). */
export async function currentRole(email: string): Promise<Role> {
  const user = await users.get(normaliseEmail(email));
  return roleFor({ email, role: user?.role });
}
