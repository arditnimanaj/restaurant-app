"use server";

import { prisma } from "@/lib/db";

export type ReservationState = { success?: boolean; error?: string };

export async function submitReservation(
  _prevState: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const partySize = Number(formData.get("partySize"));
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name || !email || !phone || !date || !time) {
    return { error: "Please fill in every required field." };
  }
  if (!email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }
  if (!Number.isFinite(partySize) || partySize < 1 || partySize > 20) {
    return { error: "Party size must be between 1 and 20." };
  }

  const reservedAt = new Date(`${date}T${time}`);
  if (Number.isNaN(reservedAt.getTime())) {
    return { error: "Please choose a valid date and time." };
  }
  if (reservedAt.getTime() < Date.now()) {
    return { error: "Please choose a date and time in the future." };
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
