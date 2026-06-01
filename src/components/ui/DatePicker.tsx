"use client";

import { format, isValid, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";
import { useLocale } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils/cn";

type DatePickerProps = {
  value?: string; // ISO YYYY-MM-DD
  onChange: (next?: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
};

function toDate(value?: string) {
  if (!value) return undefined;
  const d = parseISO(value);
  return isValid(d) ? d : undefined;
}

function toISO(d?: Date) {
  if (!d) return undefined;
  // garde YYYY-MM-DD (sans timezone)
  return format(d, "yyyy-MM-dd");
}

export function DatePicker({ value, onChange, label, placeholder, className }: DatePickerProps) {
  const locale = useLocale();
  const date = toDate(value);

  const dateLabel = date
    ? format(date, "d MMM yyyy", { locale: locale === "en" ? enUS : fr })
    : placeholder ?? "—";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "group w-full rounded-2xl border border-black/10 bg-white px-4 py-2 text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900",
            className,
          )}
          aria-label={label}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {label}
              </p>
              <p className={cn("mt-1 truncate text-sm font-semibold", date ? "text-black" : "text-zinc-500")}>
                {dateLabel}
              </p>
            </div>
            <CalendarIcon className="h-4 w-4 flex-none text-zinc-400 group-hover:text-zinc-600" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-2">
        <div className="rounded-xl bg-white p-2 dark:bg-zinc-950">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(d) => onChange(toISO(d))}
            weekStartsOn={1}
            locale={locale === "en" ? enUS : fr}
            className="rounded-xl"
            classNames={{
              [UI.Months]: "flex flex-col gap-4",
              [UI.Month]: "space-y-3",
              [UI.MonthCaption]: "flex items-center justify-between px-2",
              [UI.CaptionLabel]: "text-sm font-semibold text-black dark:text-white",
              [UI.Nav]: "flex items-center gap-2",
              [UI.PreviousMonthButton]:
                "h-9 w-9 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900",
              [UI.NextMonthButton]:
                "h-9 w-9 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900",
              [UI.MonthGrid]: "w-full border-collapse",
              [UI.Weekdays]: "flex",
              [UI.Weekday]:
                "w-9 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400",
              [UI.Weeks]: "mt-2",
              [UI.Week]: "flex w-full",
              [UI.Day]: "relative w-9 text-center",
              [UI.DayButton]:
                "h-9 w-9 rounded-xl text-sm text-zinc-700 hover:bg-black/5 transition dark:text-zinc-200 dark:hover:bg-white/10",

              [SelectionState.selected]:
                "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white",
              [SelectionState.range_start]:
                "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white",
              [SelectionState.range_end]:
                "bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white",
              [SelectionState.range_middle]: "bg-black/5 dark:bg-white/10",

              [DayFlag.today]: "ring-2 ring-black/20 dark:ring-white/20",
              [DayFlag.outside]: "text-zinc-300 dark:text-zinc-600",
              [DayFlag.disabled]: "text-zinc-300 dark:text-zinc-600",
            }}
          />
        </div>

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-black hover:bg-zinc-50 transition dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900"
            onClick={() => onChange(undefined)}
          >
            {locale === "en" ? "Clear" : "Effacer"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 8h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
