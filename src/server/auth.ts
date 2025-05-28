import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // tell next i will use (google or github or email) as auth provider to login
  // we will use only credentails auth (sign in with email and password)
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days as refresh token when end should be login again
    updateAge: 24 * 60 * 60, // 24 hours as access token
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,
  providers: [
    Credentials({
      name: "Credentials", 
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: " hallo@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
        async authorize(credentials) {
            const user = credentials;
            return {
                id : crypto.randomUUID(),
                ...user
            }
        }
    }),
  ],
  adapter: PrismaAdapter(db),
  pages:{
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  }
};
