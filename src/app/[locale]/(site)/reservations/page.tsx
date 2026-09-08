import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ReservationForm } from "./reservation-form";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("reservations");
  return { title: `${t("title")} | Ember & Oak` };
}

export default async function ReservationsPage() {
  const t = await getTranslations("reservations");
  const tFooter = await getTranslations("footer");

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <div className="relative hidden overflow-hidden rounded-lg lg:col-span-2 lg:block">
          <Image
            src="https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?w=900&q=75"
            alt="A candlelit table set for dinner at Ember & Oak"
            fill
            sizes="40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-4 p-6">
            <div className="flex items-center gap-3 text-sm text-white/90">
              <Clock className="size-4 text-primary" />
              <span>{tFooter("hoursLine1")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/90">
              <MapPin className="size-4 text-primary" />
              <span>123 Market Street, Springfield</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/90">
              <Phone className="size-4 text-primary" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>

        <Card className="border-border/60 bg-card/60 lg:col-span-3">
          <CardContent className="p-6 sm:p-8">
            <ReservationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
