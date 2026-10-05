import {BilingualText, ContactInfo, Stat} from "./types";

export const siteIdentity = {
  name: "Md. Quddus Alam",

  role: {
    en: "Freelance Photojournalist",
    bn: "ফ্রিল্যান্স ফটোসাংবাদিক"
  } satisfies BilingualText,

  location: {
    en: "Gaibandha, Bangladesh",
    bn: "গাইবান্ধা, বাংলাদেশ"
  } satisfies BilingualText
};

export const bio = {
  en: "BIO_TEXT_PENDING_REVIEW",
  bn: "জীবনীর বাংলা লেখা পরবর্তীতে যুক্ত হবে।"
} satisfies BilingualText;

export const homeStats: Stat[] = [
  {
    id: "years-active",
    value: 0,
    label: {
      en: "Years Active",
      bn: "কর্মজীবনের বছর"
    }
  },
  {
    id: "exhibitions",
    value: 0,
    label: {
      en: "Exhibitions",
      bn: "প্রদর্শনী"
    }
  },
  {
    id: "awards",
    value: 0,
    label: {
      en: "Awards",
      bn: "পুরস্কার"
    }
  }
];

export const contactInfo: ContactInfo = {
  email: "CONTACT_EMAIL_PENDING",
  phone: "CONTACT_PHONE_PENDING",
  location: {
    en: "Gaibandha, Bangladesh",
    bn: "গাইবান্ধা, বাংলাদেশ"
  }
};

export const homeMedia = {
  banner: {
    src: "/images/home/banner-placeholder.svg",
    alt: {
      en: "Photography portfolio banner",
      bn: "ফটোগ্রাফি পোর্টফোলিও ব্যানার"
    }
  },

  photographer: [
    {
      src: "/images/home/portrait-placeholder.svg",
      alt: {
        en: "Portrait of Md. Quddus Alam",
        bn: "মোঃ কুদ্দুস আলমের প্রতিকৃতি"
      }
    },
    {
      src: "/images/home/work-placeholder.svg",
      alt: {
        en: "Md. Quddus Alam at work",
        bn: "কাজের সময় মোঃ কুদ্দুস আলম"
      }
    },
    {
      src: "/images/home/field-placeholder.svg",
      alt: {
        en: "Md. Quddus Alam working in the field",
        bn: "মাঠে কাজ করছেন মোঃ কুদ্দুস আলম"
      }
    }
  ]
};