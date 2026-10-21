"use client";

import { useLocale, useTranslations } from "next-intl";

import type {
  ExperienceOrganization,
  ExperienceProfile,
  ExperienceRole,
  Locale,
} from "@/content/types";

type ProfessionalExperienceProps = {
  experience: ExperienceProfile;
};

export default function ProfessionalExperience({
  experience,
}: ProfessionalExperienceProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("experience");

  return (
    <section
      aria-labelledby="professional-experience"
      className="mx-auto mt-16 max-w-5xl px-4 sm:mt-20 sm:px-6 lg:px-8"
    >
      {/* Section heading */}
      <div className="max-w-2xl">
        <h2
          id="professional-experience"
          className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-3xl"
        >
          {t("title")}
        </h2>

        <p
          className={[
            "mt-2 text-sm leading-6 text-[var(--muted-ink)]",
            locale === "en" ? "italic" : "",
          ].join(" ")}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* News agency representation */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">
          {t("newsAgency")}
        </h3>

        <ul className="glass mt-3 overflow-hidden rounded-2xl">
          {experience.agencies.map((role) => (
            <ExperienceRow
              key={role.id}
              role={role}
              locale={locale}
            />
          ))}
        </ul>
      </div>

      {/* Freelance photography and documentary assignments */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">
          {t("freelance")}
        </h3>

        <div className="glass mt-3 rounded-2xl p-4 sm:p-5">
          <h4 className="text-base font-semibold text-[var(--ink)]">
            {experience.freelance.title[locale]}
          </h4>

          <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">
            {experience.freelance.description[locale]}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {experience.freelance.organizations.map((organization) => (
              <li key={organization.id}>
                <OrganizationItem
                  organization={organization}
                  locale={locale}
                />
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm leading-6 text-[var(--muted-ink)]">
            <span className="font-semibold text-[var(--ink)]">
              {t("fieldExperience")}:
            </span>{" "}
            {experience.freelance.fieldNote[locale]}
          </p>
        </div>
      </div>

      {/* Additional professional experience */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">
          {t("additional")}
        </h3>

        <ul className="glass mt-3 overflow-hidden rounded-2xl">
          {experience.additional.map((role) => (
            <ExperienceRow
              key={role.id}
              role={role}
              locale={locale}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

type ExperienceRowProps = {
  role: ExperienceRole;
  locale: Locale;
};

function ExperienceRow({
  role,
  locale,
}: ExperienceRowProps) {
  return (
    <li className="border-b border-[var(--border)] px-4 py-3 last:border-b-0 sm:px-5">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-sm font-semibold text-[var(--ink)] sm:text-base">
          {role.organization[locale]}
        </span>

        <span className="text-sm text-[var(--accent)]">
          {role.title ? role.title[locale] : role.label[locale]}
        </span>

        {role.period ? (
          <span className="text-xs text-[var(--muted-ink)] sm:ml-auto">
            {role.period[locale]}
          </span>
        ) : null}
      </div>

      {role.description ? (
        <p className="mt-1 text-xs leading-5 text-[var(--muted-ink)]">
          {role.description[locale]}
        </p>
      ) : null}
    </li>
  );
}

type OrganizationItemProps = {
  organization: ExperienceOrganization;
  locale: Locale;
};

function OrganizationItem({
  organization,
  locale,
}: OrganizationItemProps) {
  return (
    <span className="block rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--ink)]">
      {organization.name[locale]}
    </span>
  );
}
