"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { logout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLinks({
  pathname,
  asSheetClose,
}: {
  pathname: string;
  asSheetClose?: boolean;
}) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        const content = (
          <>
            <Icon className="size-4" />
            {item.label}
          </>
        );
        const className = cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        );

        if (asSheetClose) {
          return (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={<Link href={item.href} />}
              className={className}
            >
              {content}
            </SheetClose>
          );
        }
        return (
          <Link key={item.href} href={item.href} className={className}>
            {content}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-card/40 md:flex">
      <div className="border-b border-border/60 px-6 py-6">
        <p className="font-heading text-xl tracking-wide">
          Ember <span className="text-primary">&amp;</span> Oak
        </p>
        <p className="mt-0.5 text-xs tracking-widest text-muted-foreground uppercase">
          Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <NavLinks pathname={pathname} />
      </nav>

      <div className="border-t border-border/60 p-3">
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </form>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-card/40 px-4 py-4 md:hidden">
      <p className="font-heading text-lg tracking-wide">
        Ember <span className="text-primary">&amp;</span> Oak
      </p>
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-4/5 flex-col">
          <SheetHeader>
            <SheetTitle className="font-heading text-xl tracking-wide">
              Ember <span className="text-primary">&amp;</span> Oak
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-1 px-2">
            <NavLinks pathname={pathname} asSheetClose />
          </nav>
          <div className="border-t border-border/60 p-3">
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
