import { UtensilsCrossed, CalendarCheck, CalendarClock, MessageSquare } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const CATEGORIES = ["STARTER", "MAIN", "DESSERT", "DRINK"] as const;

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  PENDING: "secondary",
  CONFIRMED: "default",
  CANCELLED: "destructive",
};

export default async function AdminDashboardPage() {
  const t = await getTranslations("admin.dashboard");
  const tMenu = await getTranslations("admin.menuManager.categories");
  const tStatus = await getTranslations("admin.reservationsManager.statuses");
  const locale = await getLocale();

  const in7Days = new Date();
  in7Days.setDate(in7Days.getDate() + 7);

  const [
    menuTotal,
    menuAvailable,
    menuByCategory,
    reservationsTotal,
    reservationsByStatus,
    reservationsThisWeek,
    upcomingReservations,
    messagesTotal,
    messagesUnread,
    recentMessages,
  ] = await Promise.all([
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { available: true } }),
    prisma.menuItem.groupBy({ by: ["category"], _count: true }),
    prisma.reservation.count(),
    prisma.reservation.groupBy({ by: ["status"], _count: true }),
    prisma.reservation.count({
      where: { date: { gte: new Date(), lte: in7Days }, status: { not: "CANCELLED" } },
    }),
    prisma.reservation.findMany({
      where: { date: { gte: new Date() }, status: { not: "CANCELLED" } },
      orderBy: { date: "asc" },
      take: 5,
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const statusCounts: Record<string, number> = { PENDING: 0, CONFIRMED: 0, CANCELLED: 0 };
  for (const row of reservationsByStatus) {
    statusCounts[row.status] = row._count;
  }

  const categoryCounts = CATEGORIES.map((category) => ({
    category,
    count: menuByCategory.find((c) => c.category === category)?._count ?? 0,
  }));
  const maxCategoryCount = Math.max(1, ...categoryCounts.map((c) => c.count));

  const stats = [
    {
      label: t("stats.menuItems"),
      value: menuTotal,
      subtitle: t("stats.menuItemsSubtitle", { count: menuAvailable }),
      icon: UtensilsCrossed,
      href: "/admin/menu",
    },
    {
      label: t("stats.reservations"),
      value: reservationsTotal,
      subtitle: t("stats.reservationsSubtitle", { count: statusCounts.PENDING }),
      icon: CalendarCheck,
      href: "/admin/reservations",
    },
    {
      label: t("stats.thisWeek"),
      value: reservationsThisWeek,
      subtitle: t("stats.thisWeekSubtitle"),
      icon: CalendarClock,
      href: "/admin/reservations",
    },
    {
      label: t("stats.messages"),
      value: messagesTotal,
      subtitle: t("stats.messagesSubtitle", { count: messagesUnread }),
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl tracking-wide">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Date().toLocaleDateString(locale, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="border-border/60 bg-card/60 transition-colors hover:border-primary/40">
                <CardContent className="flex items-start justify-between">
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Icon className="size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-border/60 bg-card/60">
            <CardHeader>
              <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {t("reservationStatus")}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {(["PENDING", "CONFIRMED", "CANCELLED"] as const).map((status) => (
                <Badge key={status} variant={STATUS_VARIANT[status]} className="gap-1.5">
                  {tStatus(status)} · {statusCounts[status]}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {t("upcomingReservations")}
              </CardTitle>
              <Link
                href="/admin/reservations"
                className="text-xs text-primary hover:underline"
              >
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingReservations.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("noUpcomingReservations")}</p>
              ) : (
                <ul className="space-y-3">
                  {upcomingReservations.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.date.toLocaleString(locale, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}{" "}
                          · {t("partyOf", { count: r.partySize })}
                        </p>
                      </div>
                      <Badge variant={STATUS_VARIANT[r.status]}>{tStatus(r.status)}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card/60">
            <CardHeader>
              <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {t("menuByCategory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryCounts.map((c) => (
                <div key={c.category}>
                  <div className="flex justify-between text-sm">
                    <span>{tMenu(c.category)}</span>
                    <span className="text-muted-foreground">{c.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${(c.count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {t("recentMessages")}
              </CardTitle>
              <Link
                href="/admin/messages"
                className="text-xs text-primary hover:underline"
              >
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("noMessagesYet")}</p>
              ) : (
                <ul className="space-y-3">
                  {recentMessages.map((m) => (
                    <li key={m.id} className="flex items-start gap-2 text-sm">
                      {!m.read ? (
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      ) : (
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-transparent" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {m.message}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
