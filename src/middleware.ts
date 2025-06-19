// it will run before your app and is used to set up the locale matcher.

import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes } from "./constants/enums";
import { UserRole } from "@prisma/client";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}

// This middleware will run on every request and add the x-url header to the request
// This is useful for debugging and logging purposes
// This middleware is used to protect the routes that require authentication
export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    // pathname is the path of the request after domain name
    // for example, if the request is https://example.com/en/about
    // pathname will be /en/about
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}`)
    );
    // if the pathname is empty, not starting with /en or /ar
    // or if the pathname is /api or /_next/static or /_next/image
    // or if the pathname is /favicon.ico or /robots.txt or /sitemap.xml
    // then we need to redirect to the default locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    const currentLocale = request.url.split("/")[3] as Locale;

    const isAuth = await getToken({
      req: request,
      // secret: process.env.NEXTAUTH_SECRET,
    });
    // Routes.AUTH is the path for all authentication routes "signup", "login", etc.
    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    // looping through the protectedRoutes array to check if the current pathname starts with any of the protected routes
    // if it does, then we set isProtectedRoute to true
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${currentLocale}/${route}`)
    );

    // If the user is not authenticated and trying to access a protected route, redirect to the login page
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    }
    // If the user is authenticated and trying to access an auth page, redirect to the profile page
    if (isAuth && isAuthPage) {
      const role = isAuth.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.ADMIN}`, request.url)
        );
      }
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
      );
    }
    // if the user is admin and trying to access the admin page, redirect to the admin page
    // if thee is not admin and trying to access the admin page, redirect to the profile page
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      const role = isAuth.role;
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
        );
      }
    }
    return response;
  },
  {
    callbacks: {
      authorized: () => {
        // If the user is authenticated, allow the request to continue
        // If the user is not authenticated, redirect to the login page
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
