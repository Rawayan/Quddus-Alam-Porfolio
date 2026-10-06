import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {locales, Locale} from "../../i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LocaleDocument from "../../components/LocaleDocument";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale
  }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const {locale} = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (
    await import(`../../messages/${locale}.json`)
  ).default;

  return (
  <NextIntlClientProvider messages={messages}>
    <LocaleDocument />
    <JsonLd locale={locale as "en" | "bn"} />

    <Navbar />

    <main>{children}</main>

    <Footer />
  </NextIntlClientProvider>
);
}