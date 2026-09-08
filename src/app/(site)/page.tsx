import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredItems = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  return (
    <div>
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Wood-fired cooking, seasonal ingredients
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Ember &amp; Oak is a neighborhood restaurant built around live-fire
            cooking and the best produce we can find each week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/reservations" />}
            >
              Reserve a table
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/menu" />}
            >
              View the menu
            </Button>
          </div>
        </div>
      </section>

      {featuredItems.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-semibold">From the menu</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {featuredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between gap-2">
                    <span>{item.name}</span>
                    <span className="text-base font-normal text-muted-foreground">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="link"
              nativeButton={false}
              render={<Link href="/menu" />}
            >
              See the full menu &rarr;
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
