"use client";

import { useEffect, useState } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
};

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value <= 0) {
      setCount(0);
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    let animationFrame = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

type AchievementCountersProps = {
  years: number;
  awards: number;
  exhibitions: number;
  publications: number;
  labels: {
    years: string;
    awards: string;
    exhibitions: string;
    publications: string;
  };
};

export default function AchievementCounters({
  years,
  awards,
  exhibitions,
  publications,
  labels,
}: AchievementCountersProps) {
  const counters = [
    {
      id: "years",
      value: years,
      label: labels.years,
      suffix: "+",
    },
    {
      id: "awards",
      value: awards,
      label: labels.awards,
    },
    {
      id: "exhibitions",
      value: exhibitions,
      label: labels.exhibitions,
    },
    {
      id: "publications",
      value: publications,
      label: labels.publications,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {counters.map((counter) => (
        <div
          key={counter.id}
          className="glass-card rounded-3xl p-5 sm:p-6"
        >
          <div className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            <Counter
              value={counter.value}
              suffix={counter.suffix}
            />
          </div>

          <p className="mt-2 text-sm text-[var(--muted-ink)]">
            {counter.label}
          </p>
        </div>
      ))}
    </div>
  );
}