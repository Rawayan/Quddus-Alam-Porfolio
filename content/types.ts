export type Locale = "en" | "bn";

export type BilingualText = {
  en: string;
  bn: string;
};

export type PhotoCategory =
  | "rivers"
  | "rural"
  | "fields"
  | "skies";

export type Photo = {
  id: string;
  src: string;
  alt: BilingualText;
  caption: BilingualText;
  category: PhotoCategory;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type AchievementType =
  | "award"
  | "exhibition"
  | "publication"
  | "recognition";

export type Achievement = {
  id: string;
  year: number;
  type: AchievementType;
  title: BilingualText;
  organization: BilingualText;
  description?: BilingualText;
};

export type Stat = {
  id: string;
  value: number;
  suffix?: string;
  label: BilingualText;
};

/*
 * Professional experience records. They are kept separate from
 * the achievements collection so that filters, counters and the
 * awards timeline are never affected by them.
 */
export type ExperienceRole = {
  id: string;
  label: BilingualText;
  organization: BilingualText;
  title?: BilingualText;
  period?: BilingualText;
  startYear?: number;
  description?: BilingualText;
};

export type ExperienceOrganization = {
  id: string;
  name: BilingualText;
};

export type ExperienceProfile = {
  agencies: ExperienceRole[];
  freelance: {
    title: BilingualText;
    description: BilingualText;
    organizations: ExperienceOrganization[];
    fieldNote: BilingualText;
  };
  additional: ExperienceRole[];
};

export type GaibandhaSection = {
  id: string;
  title: BilingualText;
  description: BilingualText;
  layout: "panoramic" | "strip" | "asymmetric" | "quad";
  photoIds: string[];
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: BilingualText;
};