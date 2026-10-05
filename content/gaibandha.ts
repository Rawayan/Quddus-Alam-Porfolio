import type { GaibandhaSection } from "./types";

export const gaibandhaIntro = {
  en: "Gaibandha is a landscape of rivers, fields, rural communities, and changing skies. This collection presents the district through four different visual perspectives.",
  bn: "গাইবান্ধা নদী, মাঠ, গ্রামীণ জনপদ এবং পরিবর্তনশীল আকাশের এক বৈচিত্র্যময় ভূদৃশ্য। এই সংগ্রহে চারটি ভিন্ন ভিজ্যুয়াল বিন্যাসে জেলাটিকে তুলে ধরা হয়েছে।",
};

export const gaibandhaSections: GaibandhaSection[] = [
  {
    id: "panoramic",
    title: {
      en: "Panoramic Landscapes",
      bn: "প্যানোরামিক প্রাকৃতিক দৃশ্য",
    },
    description: {
      en: "Wide views that capture the scale and atmosphere of Gaibandha.",
      bn: "গাইবান্ধার বিস্তৃতি ও আবহকে ধারণ করা বিস্তৃত দৃশ্য।",
    },
    layout: "panoramic",
    photoIds: [],
  },
  {
    id: "river-rural",
    title: {
      en: "River & Rural Life",
      bn: "নদী ও গ্রামীণ জীবন",
    },
    description: {
      en: "Scenes from riverside communities and everyday rural life.",
      bn: "নদীপাড়ের জনপদ ও গ্রামীণ জীবনের প্রতিদিনের দৃশ্য।",
    },
    layout: "strip",
    photoIds: [],
  },
  {
    id: "landscape",
    title: {
      en: "Land & Landscape",
      bn: "ভূমি ও প্রাকৃতিক দৃশ্য",
    },
    description: {
      en: "Fields, roads, horizons, and the changing character of the land.",
      bn: "মাঠ, পথ, দিগন্ত এবং ভূমির পরিবর্তনশীল চরিত্র।",
    },
    layout: "asymmetric",
    photoIds: [],
  },
  {
    id: "four-views",
    title: {
      en: "Four Views",
      bn: "চারটি দৃশ্য",
    },
    description: {
      en: "A compact collection bringing different perspectives together.",
      bn: "বিভিন্ন দৃষ্টিভঙ্গিকে একসঙ্গে উপস্থাপন করা একটি সংক্ষিপ্ত সংগ্রহ।",
    },
    layout: "quad",
    photoIds: [],
  },
];