"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { User, Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { submitContactMessage, type ContactState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactState = {};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
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
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          {t("name")}
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary" />
          <Input id="name" name="name" required className="pl-9" />
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
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="pl-9"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          {t("message")}
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute top-3.5 left-3 size-4 text-primary" />
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
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
