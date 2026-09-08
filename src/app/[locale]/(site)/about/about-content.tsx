"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Leaf, Users, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const VALUE_KEYS = ["woodFired", "seasonal", "familyRun", "established"] as const;
const VALUE_ICONS = { woodFired: Flame, seasonal: Leaf, familyRun: Users, established: Clock };

const STORY_KEYS = ["fire", "ingredients", "table"] as const;
const STORY_IMAGES = {
  fire: {
    image:
      "https://images.unsplash.com/photo-1588182657969-777d766e31ab?w=900&q=75",
    alt: "Open wood fire used for cooking",
  },
  ingredients: {
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=900&q=75",
    alt: "Seasonal ingredients being prepared",
  },
  table: {
    image:
      "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=900&q=75",
    alt: "The dining room at Ember & Oak",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-heading text-5xl tracking-wide uppercase">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 text-lg text-muted-foreground">
          {t("intro")}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1761138785048-9dae4abb0a0c?w=1600&q=75"
            alt="A steak cooked over wood fire at Ember & Oak"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-4">
          {VALUE_KEYS.map((key) => {
            const Icon = VALUE_ICONS[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <p className="mt-4 font-heading text-lg tracking-wide">
                  {t(`values.${key}.label`)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`values.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-6">
        {STORY_KEYS.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`grid items-center gap-10 sm:grid-cols-2 ${
              i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
              <Image
                src={STORY_IMAGES[key].image}
                alt={STORY_IMAGES[key].alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                {t(`story.${key}.eyebrow`)}
              </p>
              <h2 className="mt-3 font-heading text-3xl tracking-wide">
                {t(`story.${key}.title`)}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t(`story.${key}.body`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="border-t border-border/60 bg-black/30 py-20 text-center"
      >
        <p className="mx-auto max-w-2xl px-4 text-lg text-muted-foreground italic sm:px-6">
          {t("quote")}
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/reservations" />}
            className="px-8 text-xs tracking-widest uppercase"
          >
            {t("reserve")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
