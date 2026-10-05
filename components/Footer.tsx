import {useTranslations} from "next-intl";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="px-4 pb-6 pt-12 sm:px-6 lg:px-8">
      <div
        className="
          glass
          glass-panel
          mx-auto
          max-w-7xl
          px-6
          py-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            text-sm
            opacity-70
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()}{" "}
            Md. Quddus Alam
          </p>

          <p>
            {t("home")} · {t("gallery")} ·{" "}
            {t("contact")}
          </p>
        </div>
      </div>
    </footer>
  );
}