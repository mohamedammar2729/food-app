import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n-config";
import { User, UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

// Extend the JWT interface to include user properties
// This is necessary to ensure that the JWT contains user information Role
// Partial<User> is used to make all properties optional
declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    // This callback is called when a session is created or updated
    // it will be used to add user attributes data to the session object
    // so we can access it in the client side
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
      }
      return {
        ...session, // return original session object if token is undefined (not signed in)
        // override user object with this data if you signed in successfully
        user: {
          ...session.user, 
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
        },
      };
    },
    // This callback is called when a user signs in
    // it look like you write query to database to get user data
    jwt: async ({ token }): Promise<JWT> => {
      const dbUser = await db.user.findUnique({
        where: {
          email: token?.email,
        },
      });
      if (!dbUser) {
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
        city: dbUser.city,
        country: dbUser.country,
        phone: dbUser.phone,
        postalCode: dbUser.postalCode,
        address: dbUser.address,
      };
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days as refresh token when end should be login again
    updateAge: 24 * 60 * 60, // 24 hours as access token
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,
  providers: [
    // tell next i will use (google or github or email) as auth provider to login
    // we will use only credentails auth (sign in with email and password)
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
