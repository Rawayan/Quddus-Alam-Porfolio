"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";

const navigation = [
  {key: "home", href: "/"},
  {key: "gallery", href: "/gallery"},
  {key: "achievements", href: "/achievements"},
  {key: "gaibandha", href: "/gaibandha"},
  {key: "contact", href: "/contact"}
];

export default function Navbar() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "bn" : "en";

    if (locale === "en") {
      const nextPath = pathname === "/" ? "/bn" : `/bn${pathname}`;
      router.push(nextPath);
    } else {
      const nextPath = pathname.replace(/^\/bn/, "") || "/";
      router.push(nextPath);
    }

    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/bn";
    }

    return pathname === href || pathname === `/bn${href}`;
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <nav className="glass glass-pill mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5">
        {/* Logo */}
        <Link
          href={locale === "bn" ? "/bn" : "/"}
          className="shrink-0 text-sm font-bold tracking-tight sm:text-base"
        >
          Md. Quddus Alam
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={locale === "bn" ? `/bn${item.href}` : item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-[var(--glass-strong)] text-[var(--accent)]"
                  : "opacity-70 hover:bg-[var(--glass-strong)] hover:opacity-100"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={switchLocale}
            className="glass-button px-3 py-2 text-xs"
            aria-label={t("language")}
          >
            {locale === "en" ? "বাংলা" : "EN"}
          </button>

          <ThemeToggle label={t("toggleTheme")} />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="glass-button px-3 py-2 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="text-lg leading-none">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="glass glass-panel mx-auto mt-2 max-w-7xl p-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={locale === "bn" ? `/bn${item.href}` : item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-[var(--glass-strong)] text-[var(--accent)]"
                    : "opacity-75 hover:bg-[var(--glass-strong)] hover:opacity-100"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}

            <div className="mt-2 flex gap-2 border-t border-[var(--glass-border)] pt-3">
              <button
                type="button"
                onClick={switchLocale}
                className="glass-button flex-1"
              >
                {locale === "en" ? "বাংলা" : "English"}
              </button>

              <ThemeToggle
                label={t("toggleTheme")}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;

    setDark(nextDark);

    document.documentElement.classList.toggle("dark", nextDark);

    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`glass-button px-3 py-2 text-xs ${className}`}
      aria-label={label}
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}