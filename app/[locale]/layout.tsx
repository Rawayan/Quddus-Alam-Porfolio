import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {locales, Locale} from "../../i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen">
        <Navbar />

        {children}

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}