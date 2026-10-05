"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";

import PhotoFrame from "./PhotoFrame";

import {photos} from "../content/photos";
import {Photo, PhotoCategory} from "../content/types";

type FilterValue = "all" | PhotoCategory;

const filters: FilterValue[] = [
  "all",
  "rivers",
  "rural",
  "fields",
  "skies"
];

function shufflePhotos(items: Photo[]): Photo[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
}

export default function GalleryGrid() {
  const t = useTranslations("gallery");
  const locale = useLocale() as "en" | "bn";

  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const [orderedPhotos, setOrderedPhotos] =
    useState<Photo[]>([]);

  /*
   * Randomize only once when the page loads.
   *
   * Important:
   * Changing the filter does NOT call shufflePhotos().
   */
  useEffect(() => {
    setOrderedPhotos(shufflePhotos(photos));
  }, []);

  const visiblePhotos = useMemo(() => {
    if (activeFilter === "all") {
      return orderedPhotos;
    }

    return orderedPhotos.filter(
      (photo) =>
        photo.category === activeFilter
    );
  }, [activeFilter, orderedPhotos]);

  return (
    <div>
      {/* Filter Bar */}

      <div
        className="
          glass
          glass-pill
          mb-8
          flex
          w-fit
          max-w-full
          flex-wrap
          gap-1.5
          p-1.5
        "
        role="tablist"
        aria-label={t("title")}
      >
        {filters.map((filter) => {
          const active =
            activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() =>
                setActiveFilter(filter)
              }
              className={`
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold
                transition

                ${
                  active
                    ? `
                      bg-[var(--accent)]
                      text-white
                      shadow-lg
                    `
                    : `
                      opacity-65
                      hover:bg-[var(--glass-background-strong)]
                      hover:opacity-100
                    `
                }
              `}
            >
              {t(filter)}
            </button>
          );
        })}
      </div>

      {/* Result Count */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p className="text-sm opacity-60">
          {t("showing", {
            count: visiblePhotos.length
          })}
        </p>
      </div>

      {/* Gallery */}

      {visiblePhotos.length > 0 ? (
        <div
          className="
            columns-1
            gap-4
            sm:columns-2
            lg:columns-3
            xl:columns-4
          "
        >
          {visiblePhotos.map((photo) => (
            <GalleryPhotoCard
              key={photo.id}
              photo={photo}
              locale={locale}
              watermark={t("watermark")}
              enquireLabel={t("enquire")}
            />
          ))}
        </div>
      ) : (
        <GalleryEmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      )}
    </div>
  );
}

function GalleryPhotoCard({
  photo,
  locale,
  watermark,
  enquireLabel
}: {
  photo: Photo;
  locale: "en" | "bn";
  watermark: string;
  enquireLabel: string;
}) {
  const caption = photo.caption[locale];
  const alt = photo.alt[locale];

  return (
    <article
      className="
        group
        mb-4
        break-inside-avoid
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[1.5rem]
        "
      >
        <PhotoFrame
          src={photo.src}
          alt={alt}
          width={photo.width}
          height={photo.height}
          blurDataURL={photo.blurDataURL}
          className="
            rounded-[1.5rem]
          "
        />

        {/* Watermark */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            right-4
            z-10
            rounded-full
            border
            border-white/20
            bg-black/20
            px-3
            py-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/75
            backdrop-blur-md
          "
        >
          {watermark}
        </div>

        {/* Caption Overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[5]
            bg-gradient-to-t
            from-black/75
            via-black/25
            to-transparent
            p-5
            pt-20
            opacity-0
            transition
            duration-300
            group-hover:opacity-100
          "
        >
          <p className="text-sm leading-6 text-white">
            {caption}
          </p>
        </div>
      </div>

      {/* Caption / Enquiry */}

      <div className="px-1 pt-3">
        <p
          className="
            line-clamp-2
            text-sm
            leading-6
            opacity-70
          "
        >
          {caption}
        </p>

        <Link
          href={{
            pathname:
              locale === "bn"
                ? "/bn/contact"
                : "/contact",
            query: {
              reason: "print",
              photo: photo.id
            }
          }}
          className="
            mt-3
            inline-flex
            items-center
            rounded-full
            border
            border-[var(--glass-border)]
            bg-[var(--glass-background)]
            px-3
            py-2
            text-xs
            font-semibold
            text-[var(--accent)]
            shadow-sm
            backdrop-blur-md
            transition
            hover:-translate-y-0.5
            hover:bg-[var(--glass-background-strong)]
          "
        >
          {enquireLabel}
          <span
            aria-hidden="true"
            className="ml-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

function GalleryEmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        glass
        glass-panel
        flex
        min-h-[360px]
        items-center
        justify-center
        px-6
        py-16
        text-center
      "
    >
      <div className="max-w-xl">
        <div
          className="
            mx-auto
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-[var(--glass-border)]
            bg-[var(--glass-background-strong)]
            text-2xl
          "
          aria-hidden="true"
        >
          ◌
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-7 opacity-65 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}