"use server";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";

export type ReservationState = { success?: boolean; error?: string };

export async function submitReservation(
  _prevState: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const t = await getTranslations("reservations.errors");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const partySize = Number(formData.get("partySize"));
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name || !email || !phone || !date || !time) {
    return { error: t("missingFields") };
  }
  if (!email.includes("@")) {
    return { error: t("invalidEmail") };
  }
  if (!Number.isFinite(partySize) || partySize < 1 || partySize > 20) {
    return { error: t("invalidPartySize") };
  }

  const reservedAt = new Date(`${date}T${time}`);
  if (Number.isNaN(reservedAt.getTime())) {
    return { error: t("invalidDateTime") };
  }
  if (reservedAt.getTime() < Date.now()) {
    return { error: t("pastDateTime") };
  }

  await prisma.reservation.create({
    data: {
      name,
      email,
      phone,
      date: reservedAt,
      partySize,
      notes: notes || null,
    },
  });

  return { success: true };
}
