"use server";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";

export type ContactState = { success?: boolean; error?: string };

export async function submitContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const t = await getTranslations("contact.errors");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: t("missingFields") };
  }
  if (!email.includes("@")) {
    return { error: t("invalidEmail") };
  }

  await prisma.contactMessage.create({ data: { name, email, message } });

  return { success: true };
}
