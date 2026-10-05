"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type {
  Achievement,
  AchievementType,
} from "@/content/types";

type FilterKey = "all" | AchievementType;

type AchievementTimelineProps = {
  achievements: Achievement[];
};

const filters: FilterKey[] = [
  "all",
  "award",
  "exhibition",
  "publication",
  "recognition",
];

export default function AchievementTimeline({
  achievements,
}: AchievementTimelineProps) {
  const locale = useLocale();
  const t = useTranslations("achievements");

  const [activeFilter, setActiveFilter] =
    useState<FilterKey>("all");

  const filteredAchievements = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? achievements
        : achievements.filter(
            (achievement) =>
              achievement.type === activeFilter,
          );

    return [...filtered].sort(
      (a, b) => b.year - a.year,
    );
  }, [achievements, activeFilter]);

  return (
    <section>
      {/* Section heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {t("timeline")}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={active}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                active
                  ? "bg-[var(--accent)] text-white shadow-md"
                  : "glass text-[var(--ink)] hover:-translate-y-0.5",
              ].join(" ")}
            >
              {t(filter)}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mb-6 text-sm text-[var(--muted-ink)]">
        {t("entries", {
          count: filteredAchievements.length,
        })}
      </p>

      {/* Empty state */}
      {filteredAchievements.length === 0 ? (
        <div className="glass-panel rounded-3xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-[var(--ink)]">
            {t("emptyTitle")}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[var(--muted-ink)]">
            {t("emptyDescription")}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[19px] top-0 w-px bg-[var(--border)] sm:left-[104px]"
          />

          <div className="space-y-8">
            {filteredAchievements.map(
              (achievement, index) => {
                const title =
                  achievement.title[locale];

                const organization =
                  achievement.organization[locale];

                const description =
                  achievement.description?.[locale];

                return (
                  <article
                    key={achievement.id}
                    className="relative grid grid-cols-[40px_1fr] gap-5 sm:grid-cols-[105px_1fr] sm:gap-8"
                  >
                    {/* Year */}
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="rounded-full bg-[var(--accent)] px-2 py-1 text-xs font-semibold text-white sm:px-3">
                        {achievement.year}
                      </span>

                      <span
                        aria-hidden="true"
                        className="mt-4 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--accent)] shadow-md"
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={[
                        "glass-card rounded-3xl p-5 sm:p-6",
                        "transition duration-300",
                        "hover:-translate-y-1 hover:shadow-xl",
                        index === 0 ? "ring-1 ring-[var(--accent)]/20" : "",
                      ].join(" ")}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold capitalize text-[var(--accent)]">
                          {t(achievement.type)}
                        </span>

                        <span className="text-xs text-[var(--muted-ink)]">
                          {t("year")}: {achievement.year}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
                        {title}
                      </h3>

                      <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                        {organization}
                      </p>

                      {description ? (
                        <p className="mt-4 text-sm leading-7 text-[var(--muted-ink)]">
                          {description}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      )}
    </section>
  );
}