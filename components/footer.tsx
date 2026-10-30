import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { modules } from "@/lib/modules";

export function Footer() {
  const t = useTranslations("footer");
  const tModules = useTranslations("modules");

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <p className="text-base font-semibold tracking-tight">
            Pre<span className="text-primary">Life</span>
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {modules.map((mod) => (
            <Link
              key={mod.slug}
              href={`/${mod.slug}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {tModules(`${mod.slug}Name`)}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}
