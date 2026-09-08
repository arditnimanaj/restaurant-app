import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery");
  return { title: `${t("title")} | Ember & Oak` };
}

const GALLERY_ITEMS = [
  {
    key: "diningRoom",
    src: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=800&q=75",
  },
  {
    key: "hearth",
    src: "https://images.unsplash.com/photo-1588182657969-777d766e31ab?w=800&q=75",
  },
  {
    key: "ribeye",
    src: "https://images.unsplash.com/photo-1761138785048-9dae4abb0a0c?w=800&q=75",
  },
  {
    key: "bar",
    src: "https://images.unsplash.com/photo-1718044402845-1f7c40598dec?w=800&q=75",
  },
  {
    key: "privateEvents",
    src: "https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?w=800&q=75",
  },
  {
    key: "dessert",
    src: "https://images.unsplash.com/photo-1541781550486-81b7a2328578?w=800&q=75",
  },
] as const;

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_ITEMS.map((item) => {
          const label = t(`items.${item.key}`);
          return (
            <div
              key={item.key}
              className="group relative flex aspect-square items-end overflow-hidden rounded-lg ring-1 ring-border/60"
            >
              <Image
                src={item.src}
                alt={label}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <span className="relative p-4 text-sm font-medium tracking-wide text-white uppercase drop-shadow">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
