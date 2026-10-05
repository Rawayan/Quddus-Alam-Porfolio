"use client";

import {useEffect} from "react";
import {useLocale} from "next-intl";

export default function LocaleDocument() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;

    document.documentElement.dir = "ltr";
  }, [locale]);

  return null;
}