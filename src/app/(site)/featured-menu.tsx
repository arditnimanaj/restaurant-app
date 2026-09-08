"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type FeaturedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
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
          Signature dishes
        </p>
        <h2 className="mt-3 font-heading text-3xl tracking-wide uppercase">
          From the menu
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
            <Card className="h-full border-border/60 bg-card/60 transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between gap-2 font-heading text-lg font-normal tracking-wide">
                  <span>{menuItem.name}</span>
                  <span className="text-sm font-sans text-primary">
                    ${menuItem.price.toFixed(2)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
          See the full menu
        </Link>
      </motion.div>
    </section>
  );
}
