import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";

const intlMiddleware = createIntlMiddleware(routing);

function stripLocalePrefix(pathname: string) {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
  }
  return pathname;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localePrefix = pathname.startsWith("/de") ? "/de" : "";
  const path = stripLocalePrefix(pathname);

  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);

    if (!valid) {
      const loginUrl = new URL(`${localePrefix}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
