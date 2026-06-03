"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/lib/utils/cn";
import type { DateRange } from "react-day-picker";

type Mode = "calendar" | "flexible";

export function CalendarToolsDemo() {
  const t = useTranslations("calendarTools");
  const [mode, setMode] = useState<Mode>("calendar");
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [flex, setFlex] = useState<string>("weekend");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const pills = useMemo(
    () => [
      { key: "calendar" as const, label: t("tabCalendar") },
      { key: "flexible" as const, label: t("tabFlexible") },
    ],
    [t],
  );

  const flexOptions = useMemo(
    () => [
      { key: "weekend", label: t("flexWeekend") },
      { key: "week", label: t("flexWeek") },
      { key: "twoWeeks", label: t("flexTwoWeeks") },
      { key: "month", label: t("flexMonth") },
    ],
    [t],
  );

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm shadow-black/10 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-zinc-100 p-1">
          {pills.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setMode(p.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                mode === p.key ? "bg-white text-black shadow-sm shadow-black/10" : "text-zinc-600 hover:text-black",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "calendar" ? (
        <div className="mt-4">
          <div className="max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              month={month}
              onMonthChange={setMonth}
              className="relative bg-white w-max pt-2"
              classNames={{
                months: "flex flex-row gap-6",
                nav: "absolute left-2 right-2 top-2 flex items-center justify-between pointer-events-none",
                button_previous:
                  "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 transition hover:bg-zinc-50",
                button_next:
                  "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 transition hover:bg-zinc-50",
                month_caption: "flex items-center justify-center px-2 pt-1",
              }}
            />
          </div>
          <p className="mt-3 text-xs text-zinc-500">{t("hint")}</p>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm font-semibold text-black">{t("flexTitle")}</p>
          <p className="mt-1 text-sm text-zinc-600">{t("flexSubtitle")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {flexOptions.map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => setFlex(o.key)}
                className={cn(
                  "rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm shadow-black/5 transition",
                  flex === o.key ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-50",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-black/10 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-black">{t("flexResultTitle")}</p>
            <p className="mt-2 text-sm text-zinc-600">{t("flexResultBody")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
