import Link from "next/link";
import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import PageContainer from "../../components/PageContainer";
import StatCard from "../../components/StatCard";
import HomeImageCard from "../../components/HomeImageCard";

import {bio, homeMedia, homeStats} from "../../content";

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const galleryHref = locale === "bn" ? "/bn/gallery" : "/gallery";
  const contactHref = locale === "bn" ? "/bn/contact" : "/contact";

  return (
    <PageContainer className="pt-6 sm:pt-8 lg:pt-10">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        <div className="glass glass-panel relative min-h-[55vh] overflow-hidden sm:min-h-[65vh]">
          <Image
            src={homeMedia.banner.src}
            alt={t("home.bannerAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <div className="max-w-3xl text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
                {t("home.eyebrow")}
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
                {t("home.title")}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                {t("home.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bio + Photographer Photos */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Bio */}
        <div className="glass glass-panel flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {t("home.eyebrow")}
            </p>

            <p className="mt-6 text-base leading-8 opacity-75 sm:text-lg">
              {bio[locale as "en" | "bn"]}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {homeStats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={galleryHref}
              className="glass-button glass-button-primary"
            >
              {t("home.viewGallery")}
            </Link>

            <Link
              href={contactHref}
              className="glass-button"
            >
              {t("home.contact")}
            </Link>
          </div>
        </div>

        {/* Three Photographer Photos */}
        <div className="grid min-h-[600px] grid-cols-2 grid-rows-2 gap-4">
          <HomeImageCard
            src={homeMedia.photographer[0].src}
            alt={t("home.portraitAlt")}
            className="row-span-2 min-h-[500px]"
          />

          <HomeImageCard
            src={homeMedia.photographer[1].src}
            alt={t("home.workAlt")}
            className="min-h-[290px]"
          />

          <HomeImageCard
            src={homeMedia.photographer[2].src}
            alt={t("home.fieldAlt")}
            className="min-h-[290px]"
          />
        </div>
      </section>
    </PageContainer>
  );
}