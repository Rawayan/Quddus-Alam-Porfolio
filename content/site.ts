import type { ContactInfo, Stat } from "./types";

export const siteIdentity = {
  name: "Md. Quddus Alam",
  role: {
    en: "Freelance Photojournalist",
    bn: "ফ্রিল্যান্স ফটোসাংবাদিক",
  },
  location: {
    en: "Gaibandha, Bangladesh",
    bn: "গাইবান্ধা, বাংলাদেশ",
  },
};

export const bio = {
  en: "Md. Quddus Alam is a freelance photojournalist from Gaibandha, Bangladesh. His work documents people, landscapes, rural life, rivers, and everyday stories across the country.",
  bn: "মো. কুদ্দুস আলম বাংলাদেশের গাইবান্ধার একজন ফ্রিল্যান্স ফটোসাংবাদিক। তাঁর কাজ মানুষ, প্রকৃতি, গ্রামীণ জীবন, নদী এবং দেশের বিভিন্ন প্রান্তের প্রতিদিনের গল্পকে আলোকচিত্রের মাধ্যমে তুলে ধরে।",
};

export const homeStats: Stat[] = [
  {
    id: "focus",
    value: 0,
    label: {
      en: "Years of photography",
      bn: "ফটোগ্রাফির বছর",
    },
  },
  {
    id: "stories",
    value: 0,
    label: {
      en: "Stories documented",
      bn: "নথিভুক্ত গল্প",
    },
  },
  {
    id: "publications",
    value: 0,
    label: {
      en: "Publications",
      bn: "প্রকাশনা",
    },
  },
];

export const contactInfo: ContactInfo = {
  email: "Mail.quddus@gmail.com",
  phone: "+880 1712542948",
  location: {
    en: "Gaibandha, Bangladesh",
    bn: "গাইবান্ধা, বাংলাদেশ",
  },
};

export const homeMedia = {
  banner: {
    src: "/images/home/banner-placeholder.svg",
    alt: {
      en: "Photography landscape placeholder",
      bn: "ফটোগ্রাফি ল্যান্ডস্কেপ প্লেসহোল্ডার",
    },
  },
  portrait: {
    src: "/images/home/portrait-placeholder.svg",
    alt: {
      en: "Portrait placeholder",
      bn: "প্রতিকৃতি প্লেসহোল্ডার",
    },
  },
  work: {
    src: "/images/home/work-placeholder.svg",
    alt: {
      en: "Photography work placeholder",
      bn: "ফটোগ্রাফির কাজের প্লেসহোল্ডার",
    },
  },
  field: {
    src: "/images/home/field-placeholder.svg",
    alt: {
      en: "Field landscape placeholder",
      bn: "মাঠের ল্যান্ডস্কেপ প্লেসহোল্ডার",
    },
  },
};

/*
 * Compatibility object used by Contact page and ContactForm.
 * Real contact details will be integrated in Step 16.
 */
export const siteContent = {
  identity: siteIdentity,
  bio,
  homeStats,
  contact: contactInfo,
  homeMedia,
};