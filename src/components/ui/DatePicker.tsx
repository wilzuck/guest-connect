"use client";

import { format, isValid, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { Animation, DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
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
  const t = useTranslations("datePicker");
  const date = toDate(value);
  const [wide, setWide] = useState(false);
  const [open, setOpen] = useState(false);

  // Mobile-first : 1 mois. Dès sm, on passe à 2 mois (plus proche Airbnb/Booking).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const dateLabel = date
    ? format(date, "d MMM yyyy", { locale: locale === "en" ? enUS : fr })
    : placeholder ?? "—";

  const Trigger = (
    <button
      type="button"
      className={cn(
        "group h-12 w-full rounded-2xl border border-black/10 bg-white p-[10px] text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900",
        className,
      )}
      aria-label={label}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          <p className={cn("mt-1 truncate text-sm font-semibold", date ? "text-black" : "text-zinc-500")}>
            {dateLabel}
          </p>
        </div>
        <CalendarIcon className="h-4 w-4 flex-none text-zinc-400 group-hover:text-zinc-600" />
      </div>
    </button>
  );

  const calendar = (
    <DayPicker
      mode="single"
      selected={date}
      onSelect={(d) => {
        onChange(toISO(d));
        // mobile: ferme dès qu'une date est choisie
        if (d && !wide) setOpen(false);
      }}
      weekStartsOn={1}
      locale={locale === "en" ? enUS : fr}
      animate
      captionLayout="dropdown"
      numberOfMonths={wide ? 2 : 1}
      showOutsideDays
      fixedWeeks
      className="rounded-xl"
      classNames={{
        [UI.Months]: "flex flex-col gap-4",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex items-center justify-between px-2",
        [UI.CaptionLabel]: "text-sm font-semibold text-black dark:text-white",
        [UI.Dropdowns]: "flex items-center gap-2",
        [UI.Dropdown]:
          "h-10 rounded-xl border border-black/10 bg-white px-2 text-sm font-semibold text-zinc-800 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200",
        [UI.Nav]: "flex items-center gap-2",
        [UI.PreviousMonthButton]:
          "h-10 w-10 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900",
        [UI.NextMonthButton]:
          "h-10 w-10 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900",
        [UI.MonthGrid]: "w-full border-collapse",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "w-10 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400",
        [UI.Weeks]: "mt-2",
        [UI.Week]: "flex w-full",
        [UI.Day]: "relative w-10 text-center",
        [UI.DayButton]:
          "h-10 w-10 rounded-xl text-sm text-zinc-700 hover:bg-black/5 transition dark:text-zinc-200 dark:hover:bg-white/10",
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
        [Animation.caption_after_enter]: "gc-anim-slide-in-right",
        [Animation.caption_before_enter]: "gc-anim-slide-in-left",
        [Animation.caption_after_exit]: "gc-anim-fade-out",
        [Animation.caption_before_exit]: "gc-anim-fade-out",
        [Animation.weeks_after_enter]: "gc-anim-slide-in-right",
        [Animation.weeks_before_enter]: "gc-anim-slide-in-left",
        [Animation.weeks_after_exit]: "gc-anim-fade-out",
        [Animation.weeks_before_exit]: "gc-anim-fade-out",
      }}
    />
  );

  // Mobile: calendrier full-screen (style shadcn, confortable sur smartphone)
  if (!wide) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className="inset-0 h-dvh w-screen max-w-none border-0 p-0 shadow-none data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
          <div className="flex h-dvh flex-col bg-white">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <p className="text-sm font-semibold text-black">{label}</p>
              <DialogClose asChild>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 transition"
                  aria-label={t("close")}
                >
                  ✕
                </button>
              </DialogClose>
            </div>

            <div className="flex-1 overflow-auto px-3 py-4">
              {calendar}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-black/5 p-4">
              <button
                type="button"
                className="rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
                onClick={() => onChange(undefined)}
              >
                {t("clear")}
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
                >
                  {t("done")}
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop / tablette: popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
      <PopoverContent align="start" className="p-2">
        <div className="rounded-xl bg-white p-2 dark:bg-zinc-950">{calendar}</div>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-black hover:bg-zinc-50 transition dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900"
            onClick={() => onChange(undefined)}
          >
            {t("clear")}
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
