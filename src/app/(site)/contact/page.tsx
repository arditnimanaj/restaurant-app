import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Ember & Oak",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
      <p className="mt-2 text-muted-foreground">
        Questions, private events, or feedback &mdash; send us a message and
        we&rsquo;ll respond within a day or two.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
