"use client";

import {useTranslations} from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center">
        <section className="glass glass-panel w-full p-8 sm:p-12 lg:p-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
            {t("home.eyebrow")}
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            {t("home.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 opacity-75 sm:text-lg">
            {t("home.description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="glass-button glass-button-primary">
              {t("common.viewGallery")}
            </button>

            <button className="glass-button">
              {t("common.contactMe")}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}