"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-start justify-center px-4 py-24 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
      >
        {t("retry")}
      </button>
    </div>
  );
}
