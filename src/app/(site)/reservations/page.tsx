import type { Metadata } from "next";
import { ReservationForm } from "./reservation-form";

export const metadata: Metadata = {
  title: "Reservations | Ember & Oak",
};

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Join us
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          Reserve a table
        </h1>
        <p className="mt-3 text-muted-foreground">
          Submit a request below and we&rsquo;ll confirm by email or phone.
          For parties larger than 8, please contact us directly.
        </p>
      </div>
      <div className="mt-14">
        <ReservationForm />
      </div>
    </div>
  );
}
