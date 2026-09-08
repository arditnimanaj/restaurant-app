"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";
import { submitReservation, type ReservationState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ReservationState = {};

function FieldIcon({ icon: Icon }: { icon: typeof User }) {
  return (
    <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary" />
  );
}

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(
    submitReservation,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Reservation request sent! We'll confirm by email.");
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Name
          </Label>
          <div className="relative">
            <FieldIcon icon={User} />
            <Input id="name" name="name" required className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Phone
          </Label>
          <div className="relative">
            <FieldIcon icon={Phone} />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Email
        </Label>
        <div className="relative">
          <FieldIcon icon={Mail} />
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label
            htmlFor="date"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Date
          </Label>
          <div className="relative">
            <FieldIcon icon={CalendarDays} />
            <Input
              id="date"
              name="date"
              type="date"
              required
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="time"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Time
          </Label>
          <div className="relative">
            <FieldIcon icon={Clock} />
            <Input
              id="time"
              name="time"
              type="time"
              required
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="partySize"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Party size
          </Label>
          <div className="relative">
            <FieldIcon icon={Users} />
            <Input
              id="partySize"
              name="partySize"
              type="number"
              min={1}
              max={20}
              defaultValue={2}
              required
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="notes"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Notes (optional)
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute top-3.5 left-3 size-4 text-primary" />
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Allergies, special occasions, seating preferences..."
            className="pl-9"
          />
        </div>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="w-full text-xs tracking-widest uppercase"
      >
        {pending ? "Sending..." : "Request reservation"}
      </Button>
    </form>
  );
}
