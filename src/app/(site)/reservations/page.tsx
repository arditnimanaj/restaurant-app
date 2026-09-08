import type { Metadata } from "next";
import { ReservationForm } from "./reservation-form";

export const metadata: Metadata = {
  title: "Reservations | Ember & Oak",
};

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Reserve a table
      </h1>
      <p className="mt-2 text-muted-foreground">
        Submit a request below and we&rsquo;ll confirm by email or phone.
        For parties larger than 8, please contact us directly.
      </p>
      <div className="mt-10">
        <ReservationForm />
      </div>
    </div>
  );
}
