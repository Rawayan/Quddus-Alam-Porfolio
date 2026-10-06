import {getLocale, getTranslations} from "next-intl/server";

import PageContainer from "../../../components/PageContainer";
import GalleryGrid from "../../../components/GalleryGrid";

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const locale = await getLocale();

  return (
    <PageContainer className="pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      {/* Header */}

      <section className="mb-10 max-w-4xl sm:mb-14">
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.22em]
            text-[var(--accent)]
            sm:text-sm
          "
        >
          {t("eyebrow")}
        </p>

        <h1
          className="
            mt-4
            text-4xl
            font-bold
            tracking-tight
            sm:text-5xl
            lg:text-7xl
          "
        >
          {t("title")}
        </h1>

        <p
          className="
            mt-5
            max-w-2xl
            text-base
            leading-8
            opacity-70
            sm:text-lg
          "
        >
          {t("description")}
        </p>
      </section>

      {/* Gallery */}

      <section
        aria-label={t("title")}
      >
        <GalleryGrid />
      </section>
    </PageContainer>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: "en" | "bn" };
}) {
  const isBangla = params.locale === "bn";

  return {
    title: isBangla ? "গ্যালারি" : "Gallery",
    description: isBangla
      ? "বাংলাদেশের নদী, গ্রামীণ জীবন, মাঠ ও আকাশের আলোকচিত্র সংগ্রহ।"
      : "A photography collection of rivers, rural life, fields, and skies from Bangladesh.",
  };
}