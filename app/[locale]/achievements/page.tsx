import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import AchievementCounters from "@/components/AchievementCounters";
import AchievementTimeline from "@/components/AchievementTimeline";
import { achievements } from "@/content/awards";

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
    namespace: "achievements",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AchievementsPage({
  params,
}: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "achievements",
  });

  const currentYear = new Date().getFullYear();

  const careerStartYear = 2004;

  const years =
    achievements.length > 0
      ? Math.max(
          currentYear - careerStartYear,
          1,
        )
      : 0;

  const awards = achievements.filter(
    (item) => item.type === "award",
  ).length;

  const exhibitions = achievements.filter(
    (item) => item.type === "exhibition",
  ).length;

  const publications = achievements.filter(
    (item) => item.type === "publication",
  ).length;


  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="blob blob-amber -right-24 -top-32" />
          <div className="blob blob-sage -bottom-32 left-1/3" />

          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {t("eyebrow")}
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-ink)] sm:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AchievementCounters
          years={years}
          awards={awards}
          exhibitions={exhibitions}
          publications={publications}
          labels={{
            years: t("stats.years"),
            awards: t("stats.awards"),
            exhibitions: t("stats.exhibitions"),
            publications: t("stats.publications"),
          }}
        />
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AchievementTimeline
          achievements={achievements}
        />
      </section>
    </main>
  );
}