"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium tracking-widest uppercase",
        className,
      )}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 ? <span className="text-muted-foreground/40">/</span> : null}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={locale === loc ? "true" : undefined}
            className={cn(
              "transition-colors hover:text-primary",
              locale === loc
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
