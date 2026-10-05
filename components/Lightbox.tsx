"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale, Photo } from "@/content/types";

type LightboxProps = {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
};

export default function Lightbox({
  photos,
  initialIndex,
  onClose,
}: LightboxProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("gallery");

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];

  const previousPhoto = useCallback(() => {
    setCurrentIndex((index) =>
      index === 0 ? photos.length - 1 : index - 1,
    );
  }, [photos.length]);

  const nextPhoto = useCallback(() => {
    setCurrentIndex((index) =>
      index === photos.length - 1 ? 0 : index + 1,
    );
  }, [photos.length]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    },
    [nextPhoto, onClose, previousPhoto],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  if (!currentPhoto) {
    return null;
  }

  const contactHref = {
    pathname: `/${locale}/contact`,
    query: {
      reason: "print",
      photo: currentPhoto.id,
    },
  };

  const caption = currentPhoto.caption[locale];

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchEndX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      previousPhoto();
    } else {
      nextPhoto();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background close area */}
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      {/* Top controls */}
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
          {currentIndex + 1} / {photos.length}
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
          aria-label="Close lightbox"
        >
          ×
        </button>
      </div>

      {/* Previous */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={previousPhoto}
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 sm:left-6"
          aria-label="Previous photograph"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div className="relative z-10 flex h-[78vh] w-[88vw] max-w-6xl items-center justify-center">
        <Image
          src={currentPhoto.src}
          alt={currentPhoto.alt[locale]}
          fill
          sizes="90vw"
          className="object-contain"
          placeholder={
            currentPhoto.blurDataURL ? "blur" : "empty"
          }
          blurDataURL={currentPhoto.blurDataURL}
          priority
        />

        {/* Watermark */}
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/35 px-4 py-2 text-xs font-medium tracking-wide text-white/80 backdrop-blur-sm">
          {t("watermark")}
        </div>
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={nextPhoto}
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-6"
          aria-label="Next photograph"
        >
          ›
        </button>
      )}

      {/* Caption + CTA */}
      <div className="absolute bottom-4 left-4 right-4 z-20 sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[min(680px,calc(100%-2rem))] sm:-translate-x-1/2">
        <div className="glass-strong rounded-2xl p-4 text-center sm:p-5">
          <p className="text-sm leading-6 text-white sm:text-base">
            {caption}
          </p>

          <Link
            href={contactHref}
            onClick={onClose}
            className="mt-3 inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            {t("enquire")}
          </Link>
        </div>
      </div>
    </div>
  );
}