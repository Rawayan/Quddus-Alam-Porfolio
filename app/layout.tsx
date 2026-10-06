import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Md. Quddus Alam — Freelance Photojournalist",
    template: "%s | Md. Quddus Alam",
  },

  description:
    "Photography portfolio of Md. Quddus Alam, a freelance photojournalist documenting people, landscapes, rural life, rivers, and everyday stories from Bangladesh.",

  keywords: [
    "Md. Quddus Alam",
    "Quddus Alam",
    "Bangladesh photographer",
    "photojournalist",
    "Gaibandha photographer",
    "Bangladesh photography",
    "freelance photojournalist",
  ],

  authors: [
    {
      name: "Md. Quddus Alam",
    },
  ],

  creator: "Md. Quddus Alam",

  alternates: {
    languages: {
      en: "/",
      bn: "/bn",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    title: "Md. Quddus Alam — Freelance Photojournalist",
    description:
      "Photography portfolio of Md. Quddus Alam, documenting people, landscapes, rural life, rivers, and stories from Bangladesh.",
    siteName: "Md. Quddus Alam Photography",
    url: "https://your-domain.com",
    images: [
      {
        url: "/images/home/banner-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Md. Quddus Alam Photography",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Md. Quddus Alam — Freelance Photojournalist",
    description:
      "Photography portfolio of Md. Quddus Alam from Bangladesh.",
    images: ["/images/home/banner-placeholder.svg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Fixed visual background — does NOT take layout space */}
        <div
          className="site-background"
          aria-hidden="true"
        >
          <div className="blob blob-amber" />
          <div className="blob blob-sage" />
          <div className="blob blob-sky" />
        </div>

        {/* Actual application */}
        {children}
      </body>
    </html>
  );
}