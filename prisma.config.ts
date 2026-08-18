// ============================================================
// HeritageVerse — Prisma Configuration (Prisma 7+)
//
// This file configures the database connection.
// Set DATABASE_URL in .env.local before running migrations.
//
// TO ACTIVATE DATABASE:
//  1. npm install pg @prisma/adapter-pg
//  2. Set DATABASE_URL in .env.local
//  3. npx prisma migrate dev --name init
//
// Docs: https://pris.ly/d/prisma7-client-config
// ============================================================

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
});
