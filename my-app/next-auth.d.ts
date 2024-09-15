// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number; // Add any additional fields you need
    name: string;
    email: string;
  }

  interface Session {
    user: User;
    accessToken?: string; // If you are storing access tokens
  }
}