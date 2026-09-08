"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";

export type FeaturedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function FeaturedMenu({ items }: { items: FeaturedItem[] }) {
  const t = useTranslations("home.featuredMenu");

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-heading text-3xl tracking-wide uppercase">
          {t("heading")}
        </h2>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-3"
      >
        {items.map((menuItem) => (
          <motion.div key={menuItem.id} variants={item} whileHover={{ y: -6 }}>
            <Card className="h-full overflow-hidden border-border/60 bg-card/60 py-0 transition-colors hover:border-primary/40">
              {menuItem.imageUrl ? (
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={menuItem.imageUrl}
                    alt={menuItem.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <CardContent className="pt-5 pb-6">
                <div className="flex items-baseline justify-between gap-2 font-heading text-lg font-normal tracking-wide">
                  <span>{menuItem.name}</span>
                  <span className="text-sm font-sans text-primary">
                    ${menuItem.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {menuItem.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Link
          href="/menu"
          className="border-b border-primary/50 pb-1 text-xs tracking-widest text-primary uppercase transition-colors hover:border-primary"
        >
          {t("seeFullMenu")}
        </Link>
      </motion.div>
    </section>
  );
}
