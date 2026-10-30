"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Landing registration block (front-end only): name / email / password and
 * a friendly success state. No backend call - the real sign-up flow lands
 * with the platform accounts later.
 */
export function RegisterForm() {
  const t = useTranslations("landing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <div
        className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-[2rem] border bg-card p-8 text-center"
        style={{ borderColor: "var(--pl-line, var(--border))" }}
      >
        <span
          aria-hidden
          className="inline-flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(36, 22, 17, 0.06)" }}
        >
          <CheckCircle2 className="size-7" style={{ color: "var(--site-accent)" }} />
        </span>
        <p className="pl-display text-xl font-bold tracking-tight">
          {t("registerSuccess", { name: name.trim().split(/\s+/)[0] })}
        </p>
        <p className="text-sm text-muted-foreground">{t("registerNote")}</p>
      </div>
    );
  }

  const field =
    "h-12 w-full rounded-xl border border-input bg-background px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[var(--site-accent)]";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-[2rem] border bg-card p-6 md:p-8"
      style={{ borderColor: "var(--pl-line, var(--border))" }}
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("registerName")}</span>
        <input
          className={field}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("registerNamePlaceholder")}
          autoComplete="name"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("registerEmail")}</span>
        <input
          className={field}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("registerEmailPlaceholder")}
          autoComplete="email"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{t("registerPassword")}</span>
        <input
          className={field}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("registerPasswordPlaceholder")}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </label>
      <button
        type="submit"
        className="mt-1 inline-flex h-12 items-center justify-center rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#241611" }}
      >
        {t("registerSubmit")}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        {t("registerNote")}
      </p>
    </form>
  );
}
