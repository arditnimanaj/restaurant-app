"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const faceStyle: CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const CAN_FLIP_QUERY = "(min-width: 640px)";

function subscribeToCanFlip(callback: () => void) {
  const query = window.matchMedia(CAN_FLIP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getCanFlipSnapshot() {
  return window.matchMedia(CAN_FLIP_QUERY).matches;
}

function getCanFlipServerSnapshot() {
  return false;
}

function useCanFlip() {
  return useSyncExternalStore(
    subscribeToCanFlip,
    getCanFlipSnapshot,
    getCanFlipServerSnapshot,
  );
}

function CardFront({ imageSrc, label }: { imageSrc: string; label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.08 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <Image
          src={imageSrc}
          alt={label}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
      <span className="relative p-4 text-sm font-medium tracking-wide text-white uppercase drop-shadow">
        {label}
      </span>
    </>
  );
}

export function GalleryFlipCard({
  imageSrc,
  label,
  note,
}: {
  imageSrc: string;
  label: string;
  note: string;
}) {
  const canFlip = useCanFlip();
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!canFlip) {
    return (
      <div className="relative flex aspect-square items-end overflow-hidden rounded-lg ring-1 ring-border/60">
        <CardFront imageSrc={imageSrc} label={label} />
      </div>
    );
  }

  function toggle() {
    setFlipped((value) => !value);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      className="aspect-square cursor-pointer rounded-lg outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-primary"
    >
      <motion.div
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ rotateY: 180 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
        }
      >
        <div
          className="absolute inset-0 flex items-end overflow-hidden rounded-lg ring-1 ring-border/60"
          style={faceStyle}
          aria-hidden={flipped}
        >
          <CardFront imageSrc={imageSrc} label={label} />
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-lg border border-border/60 bg-card p-6"
          style={{ ...faceStyle, transform: "rotateY(180deg)" }}
          aria-hidden={!flipped}
        >
          <span className="h-px w-8 bg-primary" />
          <p className="mt-4 font-heading text-base tracking-wide text-foreground">
            {label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {note}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
