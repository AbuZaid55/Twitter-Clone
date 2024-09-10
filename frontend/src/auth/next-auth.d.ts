

import NextAuth, { DefaultSession, DefaultUser, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      twitter_token?: string;  // Add twitter_token to the user in session
    } & DefaultSession["user"];
  }

  interface User {
    twitter_token?: string;  // Add twitter_token to the User type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    twitter_token?: string;  // Add twitter_token to the JWT type
  }
}
