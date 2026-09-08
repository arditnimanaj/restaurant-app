import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { localizeMenuItem } from "@/lib/menu-i18n";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("menu");
  return { title: `${t("title")} | Ember & Oak` };
}

const CATEGORIES = ["STARTER", "MAIN", "DESSERT", "DRINK"] as const;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("menu");
  const items = (
    await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    })
  ).map((item) => localizeMenuItem(item, locale));

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          {t("title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-14 space-y-12">
        {CATEGORIES.map((category) => {
          const categoryItems = grouped[category];
          if (!categoryItems?.length) return null;
          return (
            <section key={category}>
              <h2 className="font-heading text-xl tracking-wide uppercase">
                {t(`categories.${category}`)}
              </h2>
              <Separator className="mt-3 mb-6 bg-border/60" />
              <div className="space-y-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-md object-cover ring-1 ring-border/60"
                      />
                    ) : null}
                    <div className="flex flex-1 justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <p className="shrink-0 font-medium">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {items.length === 0 ? (
          <p className="text-muted-foreground">{t("empty")}</p>
        ) : null}
      </div>
    </div>
  );
}
