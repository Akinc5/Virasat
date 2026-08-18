// ============================================================
// HeritageVerse — Prisma Client Singleton
//
// This file is a stub until you connect a database.
//
// TO ACTIVATE:
//  1. Set DATABASE_URL in .env.local
//  2. Run: npx prisma generate
//  3. Replace this entire file with the implementation below
//
// ─── IMPLEMENTATION (activate after npx prisma generate) ────
//
// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development"
//       ? ["query", "error", "warn"]
//       : ["error"],
//   });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
//
// ─────────────────────────────────────────────────────────────

// Pre-database stub — app runs on sample data, no DB needed yet.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: any = null;
