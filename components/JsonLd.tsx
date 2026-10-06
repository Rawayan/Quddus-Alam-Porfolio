type JsonLdProps = {
  locale: "en" | "bn";
};

export default function JsonLd({ locale }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md. Quddus Alam",
    jobTitle: "Freelance Photojournalist",
    description:
      locale === "bn"
        ? "বাংলাদেশের গাইবান্ধার একজন ফ্রিল্যান্স ফটোসাংবাদিক।"
        : "A freelance photojournalist documenting people, landscapes, rural life, rivers, and stories from Bangladesh.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gaibandha",
      addressCountry: "BD",
    },
    knowsAbout: [
      "Photography",
      "Photojournalism",
      "Documentary Photography",
      "Bangladesh",
      "Gaibandha",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}