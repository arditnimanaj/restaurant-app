"use client";

import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { logout } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { cn } from "cn";

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
  const t = useTranslations("admin.nav");
  const NAV_ITEMS = [
    { href: "/admin", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/admin/menu", label: t("menu"), icon: UtensilsCrossed },
    { href: "/admin/reservations", label: t("reservations"), icon: CalendarCheck },
    { href: "/admin/messages", label: t("messages"), icon: MessageSquare },
  ];

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
  const t = useTranslations("admin");

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-card/40 md:flex">
      <div className="border-b border-border/60 px-6 py-6">
        <Logo textClassName="text-xl" />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {t("adminLabel")}
          </p>
          <LanguageSwitcher />
        </div>
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
            {t("nav.logout")}
          </Button>
        </form>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();
  const t = useTranslations("admin");

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-card/40 px-4 py-4 md:hidden">
      <Logo textClassName="text-lg" />
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-4/5 flex-col">
          <SheetHeader>
            <SheetTitle>
              <Logo textClassName="text-xl" />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-1 px-2">
            <NavLinks pathname={pathname} asSheetClose />
          </nav>
          <div className="border-t border-border/60 p-3 space-y-3">
            <LanguageSwitcher className="justify-center" />
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="size-4" />
                {t("nav.logout")}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
