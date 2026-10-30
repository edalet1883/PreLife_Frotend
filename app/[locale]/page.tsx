import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Dumbbell, Salad, Brain, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { modules } from "@/lib/modules";
import { RegisterForm } from "@/components/register-form";

/**
 * Landing v3.1 - the main menu page gets the same premium grammar as the
 * four module tabs: photo hero (eyebrow / display title / rating / two
 * CTAs / stats strip), marquee band, big module cards with per-module
 * accents and photos, and the new registration section (#register) that
 * the nav "Start" button points at.
 */

const heroImage =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2400&q=80";

const moduleImages: Record<string, string> = {
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  diet: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
  meditation:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  library:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
};

const moduleIcons = { gym: Dumbbell, diet: Salad, meditation: Brain, library: BookOpen };

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });
  const tModules = await getTranslations({ locale, namespace: "modules" });

  const heroStats = [
    { value: t("statOneValue"), label: t("statOneLabel") },
    { value: t("statTwoValue"), label: t("statTwoLabel") },
    { value: t("statThreeValue"), label: t("statThreeLabel") },
  ];

  const marqueeWords = t("marqueeItems")
    .split("\u2022")
    .map((word) => word.trim())
    .filter(Boolean);

  const benefits = [
    t("registerBenefitOne"),
    t("registerBenefitTwo"),
    t("registerBenefitThree"),
  ];

  return (
    <div className="pb-0">
      {/* ------------------------------------------------------------- hero */}
      <section id="top" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-[center_30%]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(250, 247, 240, 0.82) 0%, rgba(250, 247, 240, 0.20) 58%, rgba(250, 247, 240, 0.05) 100%), linear-gradient(to top, #FAF7F0 0%, rgba(250, 247, 240, 0.86) 26%, rgba(250, 247, 240, 0.40) 58%, rgba(250, 247, 240, 0.58) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-[45%]"
          style={{
            backgroundImage:
              "radial-gradient(55% 90% at 14% 100%, rgba(36, 22, 17, 0.10) 0%, rgba(36, 22, 17, 0) 70%)",
          }}
        />
        <div className="mx-auto flex min-h-[86svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 md:px-6 md:pb-20">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#5C4F42]">
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#8C7B69]" />
            <span className="text-[#5C4F42]">{t("heroEyebrow")}</span>
          </p>
          <h1 className="pl-display mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.03em] text-[#241611] md:text-7xl lg:text-[5.25rem]">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4E4237] md:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            <span aria-hidden className="inline-flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="size-4 fill-[#B4832A]"
                  aria-hidden
                >
                  <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
                </svg>
              ))}
            </span>
            <span className="text-sm text-[#5C4F42]">{t("heroRating")}</span>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#register"
              className="pl-display inline-flex h-12 items-center rounded-full px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#241611" }}
            >
              {t("heroCtaPrimary")}
              <ArrowRight aria-hidden className="ml-2 size-4" />
            </a>
            <a
              href="#modules"
              className="inline-flex h-12 items-center rounded-full border border-[#24161122] bg-white/50 px-7 text-base font-medium text-[#241611] backdrop-blur transition-colors hover:bg-white/80"
            >
              {t("heroCtaSecondary")}
            </a>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-[#24161122] pt-7">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dd className="pl-display text-3xl font-extrabold tracking-tight text-[#241611] md:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs text-[#5C4F42] md:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ marquee band */}
      <div
        className="overflow-hidden border-y py-4"
        style={{
          borderColor: "rgba(244, 237, 227, 0.14)",
          backgroundColor: "#1C150F",
        }}
      >
        <div className="pl-marquee overflow-hidden">
          <div className="pl-marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex items-center"
              >
                {marqueeWords.map((word) => (
                  <span key={`${copy}-${word}`} className="flex items-center">
                    <span className="pl-display px-6 text-sm font-bold uppercase tracking-[0.34em] text-[#F4EDE3]">
                      {word}
                    </span>
                    <span className="text-[0.62em] text-[#E4572E]">{"\u2726"}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------- modules */}
      <section id="modules" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            <span aria-hidden className="h-px w-9 shrink-0 bg-current" />
            {t("modulesEyebrow")}
          </p>
          <h2 className="pl-display mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            {t("modulesTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {t("modulesSubtitle")}
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {modules.map((mod) => {
              const Icon = moduleIcons[mod.slug];
              return (
                <li key={mod.slug} className="pl-reveal">
                  <Link
                    href={`/${mod.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="relative h-52 overflow-hidden sm:h-60">
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${moduleImages[mod.slug]})` }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to top, rgba(20, 14, 10, 0.42) 0%, rgba(20, 14, 10, 0.05) 45%, rgba(20, 14, 10, 0) 100%)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute left-4 top-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white/85 shadow-sm backdrop-blur"
                        style={{ color: mod.accent }}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span
                        className="absolute bottom-4 left-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
                        style={{ backgroundColor: mod.accent }}
                      >
                        {tModules(`${mod.slug}Name`)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="pl-display text-xl font-bold tracking-tight">
                        {tModules(`${mod.slug}Name`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {tModules(`${mod.slug}Desc`)}
                      </p>
                      <span
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: mod.accent }}
                      >
                        {t("modulesCardCta")}
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- register */}
      <section id="register" className="scroll-mt-24 bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              <span aria-hidden className="h-px w-9 shrink-0 bg-current" />
              {t("registerEyebrow")}
            </p>
            <h2 className="pl-display mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              {t("registerTitle")}
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
              {t("registerSubtitle")}
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--site-accent-soft)" }}
                  >
                    <Check
                      className="size-3.5"
                      style={{ color: "var(--site-accent)" }}
                    />
                  </span>
                  <span className="text-[15px]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
