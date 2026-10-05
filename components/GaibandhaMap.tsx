"use client";

import { useLocale, useTranslations } from "next-intl";

import type { GaibandhaSection } from "@/content/types";

type GaibandhaMapProps = {
  sections: GaibandhaSection[];
};

const positions = [
  {
    left: "25%",
    top: "25%",
  },
  {
    left: "68%",
    top: "32%",
  },
  {
    left: "38%",
    top: "65%",
  },
  {
    left: "74%",
    top: "72%",
  },
];

export default function GaibandhaMap({
  sections,
}: GaibandhaMapProps) {
  const locale = useLocale();
  const t = useTranslations("gaibandha");

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="mb-20">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {t("mapTitle")}
        </p>

        <p className="mt-3 max-w-2xl leading-7 text-[var(--muted-ink)]">
          {t("mapDescription")}
        </p>
      </div>

      <div className="glass-panel relative min-h-[420px] overflow-hidden rounded-[2rem] p-5 sm:min-h-[500px] sm:p-8">
        {/* Decorative landscape */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[var(--blob-amber)] blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[var(--blob-sage)] blur-3xl" />
        </div>

        {/* Illustrative map */}
        <div
          className="absolute inset-8 rounded-[40%_60%_55%_45%] border border-[var(--accent)]/20 bg-[var(--accent)]/[0.04]"
          aria-hidden="true"
        />

        <div
          className="absolute left-[18%] top-[18%] h-[55%] w-[65%] rotate-12 rounded-[45%_55%_35%_65%] border border-[var(--accent)]/20"
          aria-hidden="true"
        />

        {/* Pins */}
        {sections.map((section, index) => {
          const position =
            positions[index % positions.length];

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              style={{
                left: position.left,
                top: position.top,
              }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-4 focus:ring-offset-[var(--background)]"
              aria-label={section.title[locale]}
            >
              <span className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-105 sm:px-4 sm:py-2.5 sm:text-sm">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-white"
                />

                {section.title[locale]}
              </span>
            </button>
          );
        })}

        {/* Center label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="glass rounded-full px-5 py-3 text-sm font-semibold text-[var(--ink)] shadow-lg">
            Gaibandha
          </div>
        </div>
      </div>
    </section>
  );
}