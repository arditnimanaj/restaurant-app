"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, Users, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("reservations.form");
  const [state, formAction, pending] = useActionState(
    submitReservation,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(t("successToast"));
      formRef.current?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            {t("name")}
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
            {t("phone")}
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
          {t("email")}
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
            {t("date")}
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            required
            className="w-full [color-scheme:dark]"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="time"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            {t("time")}
          </Label>
          <Input
            id="time"
            name="time"
            type="time"
            required
            className="w-full [color-scheme:dark]"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="partySize"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            {t("partySize")}
          </Label>
          <div className="relative">
            <FieldIcon icon={Users} />
            <Input
              id="partySize"
              name="partySize"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
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
          {t("notes")}
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute top-3.5 left-3 size-4 text-primary" />
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder={t("notesPlaceholder")}
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
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
