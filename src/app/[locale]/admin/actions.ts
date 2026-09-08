"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-auth";

async function localizedPath(path: string) {
  const locale = await getLocale();
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length === 0 ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    const t = await getTranslations("admin.login");
    return { error: t("error") };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  redirect(await localizedPath("/admin"));
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect(await localizedPath("/"));
}
