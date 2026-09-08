import Image from "next/image";
import { cn } from "cn";

export function Logo({
  className,
  textClassName = "text-2xl",
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-white p-1">
        <Image src="/logo.svg" alt="" width={24} height={24} className="object-contain" />
      </span>
      <span className={cn("font-heading tracking-wide", textClassName)}>
        Ember <span className="text-primary">&amp;</span> Oak
      </span>
    </span>
  );
}
