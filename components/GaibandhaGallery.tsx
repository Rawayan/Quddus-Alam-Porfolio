"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type {
  GaibandhaSection,
  Photo,
} from "@/content/types";

import PhotoFrame from "@/components/PhotoFrame";
import Lightbox from "@/components/Lightbox";

type GaibandhaGalleryProps = {
  sections: GaibandhaSection[];
  photos: Photo[];
};

function getPhotoList(
  section: GaibandhaSection,
  photos: Photo[],
) {
  return section.photoIds
    .map((id) => photos.find((photo) => photo.id === id))
    .filter((photo): photo is Photo => Boolean(photo));
}

export default function GaibandhaGallery({
  sections,
  photos,
}: GaibandhaGalleryProps) {
  const locale = useLocale();
  const t = useTranslations("gaibandha");

  const [lightbox, setLightbox] = useState<{
    photos: Photo[];
    index: number;
  } | null>(null);

  const sectionPhotos = useMemo(() => {
    return sections.map((section) => ({
      section,
      photos: getPhotoList(section, photos),
    }));
  }, [photos, sections]);

  const openLightbox = (
    sectionPhotos: Photo[],
    index: number,
  ) => {
    setLightbox({
      photos: sectionPhotos,
      index,
    });
  };

  return (
    <>
      <div className="space-y-20">
        {sectionPhotos.map(
          ({ section, photos: sectionPhotoList }) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32"
            >
              {/* Section heading */}
              <div className="mb-7 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                    {t(section.layout)}
                  </span>

                  <span className="text-sm text-[var(--muted-ink)]">
                    {t("sectionPhotos", {
                      count: sectionPhotoList.length,
                    })}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
                  {section.title[locale]}
                </h2>

                <p className="mt-3 leading-7 text-[var(--muted-ink)]">
                  {section.description[locale]}
                </p>
              </div>

              {/* Empty section */}
              {sectionPhotoList.length === 0 ? (
                <div className="glass-panel rounded-3xl px-6 py-14 text-center">
                  <p className="text-lg font-medium text-[var(--ink)]">
                    {t("emptyTitle")}
                  </p>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted-ink)]">
                    {t("emptyDescription")}
                  </p>
                </div>
              ) : (
                <>
                  {section.layout === "panoramic" && (
                    <PanoramicLayout
                      photos={sectionPhotoList}
                      locale={locale}
                      onOpen={openLightbox}
                    />
                  )}

                  {section.layout === "strip" && (
                    <StripLayout
                      photos={sectionPhotoList}
                      locale={locale}
                      onOpen={openLightbox}
                    />
                  )}

                  {section.layout === "asymmetric" && (
                    <AsymmetricLayout
                      photos={sectionPhotoList}
                      locale={locale}
                      onOpen={openLightbox}
                    />
                  )}

                  {section.layout === "quad" && (
                    <QuadLayout
                      photos={sectionPhotoList}
                      locale={locale}
                      onOpen={openLightbox}
                    />
                  )}
                </>
              )}
            </section>
          ),
        )}
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

type LayoutProps = {
  photos: Photo[];
  locale: "en" | "bn";
  onOpen: (photos: Photo[], index: number) => void;
};

function PanoramicLayout({
  photos,
  locale,
  onOpen,
}: LayoutProps) {
  const photo = photos[0];

  if (!photo) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(photos, 0)}
      className="group block w-full text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label={photo.alt[locale]}
    >
      <PhotoFrame
        photo={photo}
        className="glass-card overflow-hidden rounded-[2rem] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
          <p className="text-sm text-white">
            {photo.caption[locale]}
          </p>
        </div>
      </PhotoFrame>
    </button>
  );
}

function StripLayout({
  photos,
  locale,
  onOpen,
}: LayoutProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.slice(0, 6).map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onOpen(photos, index)}
          className="group block text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label={photo.alt[locale]}
        >
          <PhotoFrame
            photo={photo}
            className="glass-card overflow-hidden rounded-3xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </PhotoFrame>
        </button>
      ))}
    </div>
  );
}

function AsymmetricLayout({
  photos,
  locale,
  onOpen,
}: LayoutProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      {photos.slice(0, 3).map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onOpen(photos, index)}
          className={[
            "group block text-left",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
            index === 0
              ? "lg:col-span-3"
              : "lg:col-span-2",
          ].join(" ")}
          aria-label={photo.alt[locale]}
        >
          <PhotoFrame
            photo={photo}
            className="glass-card overflow-hidden rounded-[2rem] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </PhotoFrame>
        </button>
      ))}
    </div>
  );
}

function QuadLayout({
  photos,
  locale,
  onOpen,
}: LayoutProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {photos.slice(0, 4).map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onOpen(photos, index)}
          className="group block text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label={photo.alt[locale]}
        >
          <PhotoFrame
            photo={photo}
            className="glass-card overflow-hidden rounded-3xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </PhotoFrame>
        </button>
      ))}
    </div>
  );
}