import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Ember & Oak",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Get in touch
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          Contact us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions, private events, or feedback &mdash; send us a message and
          we&rsquo;ll respond within a day or two.
        </p>
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
    </div>
  );
}
