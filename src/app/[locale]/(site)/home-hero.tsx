"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const EmberScene = dynamic(
  () => import("@/components/ember-scene").then((mod) => mod.EmberScene),
  { ssr: false },
);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-black">
      <Image
        src="https://images.unsplash.com/photo-1761138785048-9dae4abb0a0c?w=1600&q=70"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/85 to-background" />
      <div className="absolute inset-0">
        <EmberScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_85%)] opacity-70" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 sm:py-40"
      >
        <motion.h1
          variants={item}
          className="font-heading text-4xl tracking-wide text-foreground uppercase sm:text-6xl"
        >
          {t("titleLine1")}
          <br className="hidden sm:block" /> {t("titleLine2")}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-6 flex items-center justify-center gap-1"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-primary text-primary" />
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-sm tracking-[0.15em] text-muted-foreground uppercase"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/reservations" />}
              className="px-8 text-xs tracking-widest uppercase"
            >
              {t("reserve")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/menu" />}
              className="border-primary/50 px-8 text-xs tracking-widest text-primary uppercase hover:bg-primary/10 hover:text-primary"
            >
              {t("discoverMenu")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
