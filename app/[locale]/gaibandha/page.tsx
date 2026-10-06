import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import GaibandhaGallery from "@/components/GaibandhaGallery";
import GaibandhaMap from "@/components/GaibandhaMap";

import {
  gaibandhaIntro,
  gaibandhaSections,
} from "@/content/gaibandha";

import { photos } from "@/content/photos";

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
    namespace: "gaibandha",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GaibandhaPage({
  params,
}: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "gaibandha",
  });

  const locale = params.locale;

  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="blob blob-amber -right-24 -top-32" />
          <div className="blob blob-sage -bottom-32 left-1/3" />

          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {t("eyebrow")}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-ink)] sm:text-lg">
              {gaibandhaIntro[locale]}
            </p>

            <a
              href="#explore"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {t("explore")}
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        id="explore"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
      >
        <GaibandhaMap sections={gaibandhaSections} />
      </section>

      {/* Photo collections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GaibandhaGallery
          sections={gaibandhaSections}
          photos={photos}
        />
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: "en" | "bn" };
}) {
  const isBangla = params.locale === "bn";

  return {
    title: isBangla ? "গাইবান্ধা" : "Gaibandha",
    description: isBangla
      ? "নদী, মাঠ, গ্রামীণ জীবন ও প্রাকৃতিক দৃশ্যের মাধ্যমে গাইবান্ধাকে দেখার একটি আলোকচিত্র সংগ্রহ।"
      : "A photographic exploration of Gaibandha through rivers, fields, rural life, and landscapes.",
  };
}