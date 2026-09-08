"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"] as const;
type ReservationStatus = (typeof STATUSES)[number];

function revalidateReservationsPaths() {
  revalidatePath("/admin/reservations");
  revalidatePath("/de/admin/reservations");
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
) {
  if (!id || !STATUSES.includes(status)) {
    throw new Error("Invalid reservation update");
  }

  await prisma.reservation.update({ where: { id }, data: { status } });

  revalidateReservationsPaths();
}

export async function deleteReservation(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  await prisma.reservation.delete({ where: { id } });

  revalidateReservationsPaths();
}
