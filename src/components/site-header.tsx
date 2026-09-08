import { MapPin, Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const NAV_LINKS = [
    { href: "/menu", label: t("menu") },
    { href: "/about", label: t("about") },
    { href: "/gallery", label: t("gallery") },
    { href: "/reservations", label: t("reservations") },
    { href: "/contact", label: t("contact") },
  ];

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
            <LanguageSwitcher />
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
          <nav className="hidden items-center gap-x-7 md:flex">
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
            className="hidden border-primary/50 px-5 text-xs tracking-widest text-primary uppercase hover:bg-primary/10 hover:text-primary md:inline-flex"
          >
            {t("findTable")}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
