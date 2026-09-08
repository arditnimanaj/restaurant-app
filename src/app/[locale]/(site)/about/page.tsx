import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutContent } from "./about-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: `${t("title")} | Ember & Oak` };
}

export default function AboutPage() {
  return <AboutContent />;
}
