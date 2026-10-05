"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import type { Photo, PhotoCategory } from "@/content/types";
import { photos } from "@/content/photos";
import PhotoFrame from "@/components/PhotoFrame";
import Lightbox from "@/components/Lightbox";

type FilterKey = "all" | PhotoCategory;

const filters: FilterKey[] = [
  "all",
  "rivers",
  "rural",
  "fields",
  "skies",
];

function shufflePhotos(items: Photo[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function GalleryGrid() {
  const t = useTranslations("gallery");
  const locale = useLocale();

  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /*
   * Shuffle exactly once when the Gallery page loads.
   * Changing filters never reshuffles the original order.
   */
  useEffect(() => {
    setOrderedPhotos(shufflePhotos(photos));
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") {
      return orderedPhotos;
    }

    return orderedPhotos.filter(
      (photo) => photo.category === activeFilter,
    );
  }, [activeFilter, orderedPhotos]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const contactHref = {
    pathname: `/${locale}/contact`,
    query: {
      reason: "print",
    },
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                isActive
                  ? "bg-[var(--accent)] text-white shadow-md"
                  : "glass text-[var(--ink)] hover:-translate-y-0.5",
              ].join(" ")}
            >
              {t(filter)}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div className="mb-6 text-sm text-[var(--muted-ink)]">
        {t("showing", { count: filteredPhotos.length })}
      </div>

      {/* Gallery */}
      {filteredPhotos.length > 0 ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="group mb-5 block w-full break-inside-avoid text-left focus:outline-none"
              aria-label={photo.alt[locale]}
            >
              <PhotoFrame
                photo={photo}
                className="glass-card overflow-hidden transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                {/* Watermark */}
                <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/80 opacity-90 backdrop-blur-sm">
                  {t("watermark")}
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-4 pt-12 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm leading-5 text-white">
                    {photo.caption[locale]}
                  </p>
                </div>
              </PhotoFrame>
            </button>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-[var(--ink)]">
            {t("emptyTitle")}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[var(--muted-ink)]">
            {t("emptyDescription")}
          </p>

          <Link
            href={contactHref}
            className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t("enquire")}
          </Link>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && filteredPhotos.length > 0 && (
        <Lightbox
          photos={filteredPhotos}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}