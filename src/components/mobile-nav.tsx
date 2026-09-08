"use client";

import Link from "next/link";
import { Menu, MapPin, Phone, Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" />}
        className="md:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-4/5 flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl tracking-wide">
            Ember <span className="text-primary">&amp;</span> Oak
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-2">
          {NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={<Link href={link.href} />}
              className="rounded-md px-3 py-3 text-sm font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto space-y-4 border-t border-border/60 p-4">
          <SheetClose
            nativeButton={false}
            render={<Link href="/reservations" />}
            className={buttonVariants({
              size: "lg",
              className: "w-full text-xs tracking-widest uppercase",
            })}
          >
            Reserve a table
          </SheetClose>

          <div className="space-y-2 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 text-primary" />
              <span>123 Market Street, Springfield</span>
            </div>
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
      </SheetContent>
    </Sheet>
  );
}
