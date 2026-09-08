"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"] as const;

export async function updateReservationStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = STATUSES.find((s) => s === formData.get("status"));
  if (!id || !status) throw new Error("Invalid reservation update");

  await prisma.reservation.update({ where: { id }, data: { status } });

  revalidatePath("/admin/reservations");
}

export async function deleteReservation(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  await prisma.reservation.delete({ where: { id } });

  revalidatePath("/admin/reservations");
}
