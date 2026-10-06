
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/content/site";

type PageProps = {
  params: {
    locale: "en" | "bn";
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "contact",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "contact",
  });

  const locale = params.locale;

  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="blob blob-amber -right-24 -top-32"
          />

          <div
            aria-hidden="true"
            className="blob blob-sage -bottom-32 left-1/3"
          />

          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {t("eyebrow")}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-ink)] sm:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        {/* Form */}
        <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            {t("formTitle")}
          </h2>

          <p className="mb-8 mt-3 max-w-xl text-sm leading-7 text-[var(--muted-ink)]">
            {t("description")}
          </p>

          <ContactForm locale={locale} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Email */}
          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t("emailLabel")}
            </p>

            <a
              href={`mailto:${siteContent.contact.email}`}
              className="mt-3 block break-all text-lg font-medium text-[var(--ink)] transition hover:text-[var(--accent)]"
            >
              {siteContent.contact.email}
            </a>
          </div>

          {/* Phone */}
          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t("phone")}
            </p>

            <a
              href={`tel:${siteContent.contact.phone}`}
              className="mt-3 block text-lg font-medium text-[var(--ink)] transition hover:text-[var(--accent)]"
            >
              {siteContent.contact.phone}
            </a>
          </div>

          {/* Location */}
          <div className="glass-card rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {t("location")}
            </p>

            <p className="mt-3 text-lg font-medium text-[var(--ink)]">
              {siteContent.contact.location[locale]}
            </p>
          </div>

          {/* Availability */}
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_5px_var(--accent-soft)]"
              />

              <p className="text-sm font-medium text-[var(--ink)]">
                {t("available")}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}