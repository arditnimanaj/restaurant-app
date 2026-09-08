"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-2xl font-semibold"
      >
        From the menu
      </motion.h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-3"
      >
        {items.map((menuItem) => (
          <motion.div key={menuItem.id} variants={item} whileHover={{ y: -6 }}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between gap-2">
                  <span>{menuItem.name}</span>
                  <span className="text-base font-normal text-muted-foreground">
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
        className="mt-8 text-center"
      >
        <Button variant="link" nativeButton={false} render={<Link href="/menu" />}>
          See the full menu &rarr;
        </Button>
      </motion.div>
    </section>
  );
}
