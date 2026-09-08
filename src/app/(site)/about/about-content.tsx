"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Leaf, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: Flame,
    label: "Wood-fired",
    description: "Every dish passes near the hearth at some point.",
  },
  {
    icon: Leaf,
    label: "Seasonal",
    description: "Menu changes with what local farms bring us.",
  },
  {
    icon: Users,
    label: "Family run",
    description: "Owned and run by the same family since day one.",
  },
  {
    icon: Clock,
    label: "Est. 2015",
    description: "A decade in the neighborhood, and counting.",
  },
];

const STORY_SECTIONS = [
  {
    eyebrow: "The fire",
    title: "Cooking over real flame",
    body: "Our kitchen is built around a wood-burning hearth, not a line of gas burners. It's slower, it's less forgiving, and it's the whole point — real fire gives food a depth you can't fake. Nearly everything that leaves the kitchen, from the bread to the dessert, passes near the flame at some point.",
    image:
      "https://images.unsplash.com/photo-1588182657969-777d766e31ab?w=900&q=75",
    alt: "Open wood fire used for cooking",
  },
  {
    eyebrow: "The ingredients",
    title: "Seasonal, sourced close to home",
    body: "We work with local farms, fishmongers, and butchers to build a menu that actually changes with the seasons — not a laminated menu that never moves. If a vegetable isn't good this week, it isn't on the plate this week. That's the deal we've made with our suppliers, and with our guests.",
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=900&q=75",
    alt: "Seasonal ingredients being prepared",
  },
  {
    eyebrow: "The table",
    title: "Hospitality first",
    body: "It's a small dining room with a big focus on hospitality. We want every table to feel like a regular's table, whether it's your first visit or your fiftieth. Servers who know the menu inside out, a room that isn't trying too hard, and food that gets to you hot.",
    image:
      "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=900&q=75",
    alt: "The dining room at Ember & Oak",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AboutContent() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Since day one
        </p>
        <h1 className="mt-3 font-heading text-5xl tracking-wide uppercase">
          Our story
        </h1>
        <p className="mx-auto mt-6 text-lg text-muted-foreground">
          Ember &amp; Oak opened with a simple idea: cook good ingredients
          over real fire, and let them speak for themselves.
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
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
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
                  {value.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-6">
        {STORY_SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
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
                src={section.image}
                alt={section.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                {section.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-3xl tracking-wide">
                {section.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {section.body}
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
          &ldquo;Whether you&rsquo;re joining us for a quiet weeknight dinner
          or a celebration, we&rsquo;re glad you&rsquo;re here.&rdquo;
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/reservations" />}
            className="px-8 text-xs tracking-widest uppercase"
          >
            Reserve a table
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
