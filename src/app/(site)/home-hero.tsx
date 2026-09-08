"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
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
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/40 to-background">
      <div className="absolute inset-0">
        <EmberScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 sm:py-36"
      >
        <motion.h1
          variants={item}
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Wood-fired cooking, seasonal ingredients
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
        >
          Ember &amp; Oak is a neighborhood restaurant built around live-fire
          cooking and the best produce we can find each week.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/reservations" />}
            >
              Reserve a table
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/menu" />}
            >
              View the menu
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
