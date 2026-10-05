"use client";

import {useLocale} from "next-intl";
import {Stat} from "../content/types";

export default function StatCard({stat}: {stat: Stat}) {
  const locale = useLocale();

  return (
    <div className="glass glass-card p-5">
      <div className="text-3xl font-bold tracking-tight sm:text-4xl">
        {stat.value}
        {stat.suffix ?? ""}
      </div>

      <p className="mt-2 text-sm opacity-65">
        {stat.label[locale as "en" | "bn"]}
      </p>
    </div>
  );
}