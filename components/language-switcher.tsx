"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeNames: Record<string, string> = {
  az: "Az\u0259rbaycanca",
  en: "English",
  ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-full border bg-card px-3 text-sm",
        className,
      )}
    >
      <Languages aria-hidden className="size-3.5 text-muted-foreground" />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) =>
          router.replace(pathname, { locale: event.target.value })
        }
        className="h-8 appearance-none bg-transparent pr-1 text-sm outline-none"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
