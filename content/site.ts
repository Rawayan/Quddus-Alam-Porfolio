import type { AchievementType, ContactInfo, Stat } from "./types";
import { achievements } from "./awards";

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

/*
 * He began working with a camera in 1978 and started professional
 * photojournalism in 2003, so the career length is counted from 2003.
 */
export const careerStartYear = 2003;

export const bio = {
  en: `My journey began in 1978, when I first picked up a camera out of curiosity and passion. What started as a hobby gradually became an inseparable part of my life. For me, photography is more than capturing images; it is a powerful language through which I tell human stories, document the passage of time, and bring the realities of life into focus.

Deeply connected to the land and people of Gaibandha, Bangladesh, my work reflects the everyday lives of people, their struggles and resilience, the beauty of nature, the richness of culture, and the defining moments of our time. Beyond what meets the eye, I seek the emotions and untold stories hidden within every frame—a fleeting expression, an ordinary moment, or a scene that bears witness to history.

In 2003, I began my professional career in photojournalism, opening a new chapter in my photographic journey. Working with national and international news organizations has broadened my perspective and deepened my commitment to documenting people, society, and the world around me through the lens of my camera.

For decades, I have continued to capture the changing landscape of life—believing that every photograph can be more than a visual record of a moment. It can become a lasting document of humanity, society, and history.

I believe the true power of a photograph lies not only in its beauty, but in the story it tells and the feelings it leaves behind...`,

  bn: `১৯৭৮ সালে শখের বশে হাতে তুলে নিয়েছিলেন ক্যামেরা। সেই থেকে শুরু হওয়া যাত্রা আজ তাঁর জীবনের অবিচ্ছেদ্য অংশ। আলোকচিত্রশিল্পী ও ফটোসাংবাদিক কুদ্দুস আলমের কাছে ক্যামেরা কেবল দৃশ্য ধারণের মাধ্যম নয়; এটি মানুষের গল্প বলার, সময়কে নথিবদ্ধ করার এবং জীবনের আড়ালে থাকা বাস্তবতাকে তুলে ধরার এক শক্তিশালী ভাষা।

গাইবান্ধার মাটি ও মানুষের সঙ্গে গভীরভাবে যুক্ত তাঁর আলোকচিত্রে প্রতিফলিত হয়েছে বাংলাদেশের জনজীবন, মানুষের সংগ্রাম, প্রকৃতি, সংস্কৃতি এবং সময়ের গুরুত্বপূর্ণ অধ্যায়। প্রতিটি ছবিতে তিনি খুঁজেছেন দৃশ্যের গভীরে থাকা অনুভূতি—একটি মুখের অভিব্যক্তি, জীবনের অনুচ্চারিত গল্প কিংবা ইতিহাসের সাক্ষী হয়ে থাকা কোনো মুহূর্ত।

২০০৩ সালে পেশাদার ফটোসাংবাদিকতা শুরু করার মধ্য দিয়ে তাঁর দীর্ঘ আলোকচিত্রযাত্রা নতুন মাত্রা লাভ করে। জাতীয় ও আন্তর্জাতিক সংবাদমাধ্যমের সঙ্গে কাজ করার অভিজ্ঞতায় সমৃদ্ধ হয়েছে তাঁর দৃষ্টিভঙ্গি, আর ক্যামেরার মাধ্যমে মানুষের জীবন ও সমাজকে তুলে ধরার প্রয়াস হয়ে উঠেছে আরও গভীর।

দশকের পর দশক ধরে তিনি নিরলসভাবে ধারণ করে চলেছেন সময়ের দৃশ্যপট—যেখানে প্রতিটি ছবি শুধু একটি মুহূর্তের প্রতিচ্ছবি নয়, বরং মানুষ, সমাজ ও ইতিহাসের একেকটি দলিল।

আমি বিশ্বাস করি, একটি আলোকচিত্রের শক্তি শুধু তার সৌন্দর্যে নয়, বরং যে গল্পটি সেটি মানুষের হৃদয়ে পৌঁছে দেয়, তার মধ্যেই নিহিত...`,
};

const countAchievements = (type: AchievementType) =>
  achievements.filter((achievement) => achievement.type === type)
    .length;

export const homeStats: Stat[] = [
  {
    id: "years",
    value: new Date().getFullYear() - careerStartYear,
    suffix: "+",
    label: {
      en: "Years of Work",
      bn: "কর্মজীবনের বছর",
    },
  },

  {
    id: "awards",
    value: countAchievements("award"),
    label: {
      en: "Awards",
      bn: "পুরস্কার",
    },
  },

  {
    id: "exhibitions",
    value: countAchievements("exhibition"),
    label: {
      en: "Exhibitions",
      bn: "প্রদর্শনী",
    },
  },

  {
    id: "publications",
    value: countAchievements("publication"),
    label: {
      en: "Publications",
      bn: "প্রকাশনা",
    },
  },
];

export const contactInfo: ContactInfo = {
  email: "mail.quddus@gmail.com",

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
 * Compatibility object used by the Contact page and ContactForm.
 *
 * Real verified portfolio content will be integrated during
 * the final content integration stage.
 */
export const siteContent = {
  identity: siteIdentity,
  bio,
  homeStats,
  contact: contactInfo,
  homeMedia,
};
