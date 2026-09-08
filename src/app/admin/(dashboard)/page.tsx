import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [menuCount, pendingReservations, unreadMessages] = await Promise.all([
    prisma.menuItem.count(),
    prisma.reservation.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Menu items", value: menuCount, href: "/admin/menu" },
    {
      label: "Pending reservations",
      value: pendingReservations,
      href: "/admin/reservations",
    },
    { label: "Unread messages", value: unreadMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="transition-colors hover:border-foreground/30">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
