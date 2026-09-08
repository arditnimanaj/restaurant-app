import { prisma } from "@/lib/db";
import {
  ReservationsManager,
  type SerializedReservation,
} from "./reservations-manager";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" },
  });

  const serialized: SerializedReservation[] = reservations.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    date: r.date.toISOString(),
    partySize: r.partySize,
    notes: r.notes,
    status: r.status,
  }));

  return <ReservationsManager reservations={serialized} />;
}
