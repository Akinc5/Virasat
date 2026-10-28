import type { DefaultSession } from "next-auth";
import type { Role } from "@/lib/auth/roles";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
