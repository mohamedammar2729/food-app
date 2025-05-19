
// it will run before your app and is used to set up the locale matcher.

import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { i18n, LanguageType } from "./i18n-config";
import {match as matchLocale} from "@formatjs/intl-localematcher";


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

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

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
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
