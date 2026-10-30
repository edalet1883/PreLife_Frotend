import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations({ locale: "en", namespace: "notFound" });

  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-start justify-center px-4 py-24 md:px-6">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
    </div>
  );
}
