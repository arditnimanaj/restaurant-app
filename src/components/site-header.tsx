import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="hidden border-b border-border/60 bg-black/40 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 text-xs tracking-wide text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-primary" />
            <span>123 Market Street, Springfield</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 text-primary" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-primary" />
              <span>hello@emberandoak.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link
            href="/"
            className="font-heading text-2xl tracking-wide text-foreground"
          >
            Ember <span className="text-primary">&amp;</span> Oak
          </Link>
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/reservations" />}
            className="border-primary/50 px-5 text-xs tracking-widest text-primary uppercase hover:bg-primary/10 hover:text-primary"
          >
            Find a table
          </Button>
        </div>
      </div>
    </header>
  );
}
