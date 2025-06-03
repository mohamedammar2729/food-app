import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n-config";

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
        },
      },
      authorize: async (credentials, req) => {
        // we can not get locale from x-url, because middleware and next-auth working parallel
        // so we need to get locale from referer url
        const currentUrl = req?.headers?.referer;
        const locale = currentUrl?.split("/")[3] as Locale;
        const res = await login(credentials, locale);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.errors,
              responseError: res.message,
            })
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
