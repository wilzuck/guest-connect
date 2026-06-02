"use client";

import { format, isValid, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";
import { useLocale, useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils/cn";

type RangeValue = {
  from?: string; // ISO YYYY-MM-DD
  to?: string; // ISO YYYY-MM-DD
};

type DateRangePickerProps = {
  value?: RangeValue;
  onChange: (next: RangeValue) => void;
  startLabel: string;
  endLabel: string;
  className?: string;
};

function toDate(value?: string) {
  if (!value) return undefined;
  const d = parseISO(value);
  return isValid(d) ? d : undefined;
}

function toISO(d?: Date) {
  if (!d) return undefined;
  return format(d, "yyyy-MM-dd");
}

export function DateRangePicker({ value, onChange, startLabel, endLabel, className }: DateRangePickerProps) {
  const locale = useLocale();
  const t = useTranslations("dateRangePicker");
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);

  // Mobile-first : plein écran. Dès sm, popover.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const fromProp = toDate(value?.from);
  const toProp = toDate(value?.to);

  const [from, setFrom] = useState<Date | undefined>(fromProp);
  const [to, setTo] = useState<Date | undefined>(toProp);

  // Sync externe → interne
  useEffect(() => setFrom(fromProp), [value?.from]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => setTo(toProp), [value?.to]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = useMemo(() => ({ from, to }), [from, to]);

  function setRange(nextFrom?: Date, nextTo?: Date) {
    setFrom(nextFrom);
    setTo(nextTo);
    onChange({ from: toISO(nextFrom), to: toISO(nextTo) });
  }

  function clear() {
    setRange(undefined, undefined);
  }

  function onDayClick(day: Date) {
    // UX stable: clic 1 = from, clic 2 = to, clic 3 = reset (recommence).
    if (!from || (from && to)) {
      setRange(day, undefined);
      return;
    }

    // from présent, to absent
    if (day < from) {
      setRange(day, from);
      return;
    }
    setRange(from, day);
    // mobile: ferme après sélection complète
    if (!wide) setOpen(false);
  }

  const fmt = (d?: Date) => (d ? format(d, "d MMM yyyy", { locale: locale === "en" ? enUS : fr }) : "—");
  const startText = fmt(from);
  const endText = fmt(to);

  const Trigger = (
    <div
      className={cn(
        "grid grid-cols-2 gap-2",
        className,
      )}
    >
      <button
        type="button"
        className="group h-14 w-full rounded-2xl border border-black/10 bg-white p-[10px] text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5"
        aria-label={startLabel}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{startLabel}</p>
        <p className={cn("mt-1 truncate text-sm font-semibold", from ? "text-black" : "text-zinc-500")}>
          {startText}
        </p>
      </button>
      <button
        type="button"
        className="group h-14 w-full rounded-2xl border border-black/10 bg-white p-[10px] text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5"
        aria-label={endLabel}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{endLabel}</p>
        <p className={cn("mt-1 truncate text-sm font-semibold", to ? "text-black" : "text-zinc-500")}>
          {endText}
        </p>
      </button>
    </div>
  );

  const calendar = (
    <DayPicker
      mode="range"
      selected={selected}
      onDayClick={onDayClick}
      weekStartsOn={1}
      locale={locale === "en" ? enUS : fr}
      numberOfMonths={wide ? 2 : 1}
      showOutsideDays
      fixedWeeks
      classNames={{
        [UI.Months]: "flex flex-col gap-6",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex items-center justify-between px-2",
        [UI.CaptionLabel]: "text-sm font-semibold text-black",
        [UI.Dropdowns]: "flex items-center gap-2",
        [UI.Dropdown]:
          "h-10 rounded-xl border border-black/10 bg-white px-2 text-sm font-semibold text-zinc-800 shadow-sm shadow-black/5",
        [UI.Nav]: "flex items-center gap-2",
        [UI.PreviousMonthButton]:
          "h-10 w-10 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition",
        [UI.NextMonthButton]:
          "h-10 w-10 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "w-10 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500",
        [UI.Week]: "flex w-full",
        [UI.Day]: "relative w-10 text-center",
        [UI.DayButton]:
          "h-10 w-10 rounded-xl text-sm text-zinc-700 hover:bg-black/5 transition",

        // Range styles (shadcn-like)
        [SelectionState.range_start]:
          "bg-black text-white hover:bg-black",
        [SelectionState.range_end]:
          "bg-black text-white hover:bg-black",
        [SelectionState.range_middle]:
          "bg-black/5",
        [SelectionState.selected]:
          "bg-black text-white hover:bg-black",

        [DayFlag.today]: "ring-2 ring-black/20",
        [DayFlag.outside]: "text-zinc-300",
        [DayFlag.disabled]: "text-zinc-300",
      }}
    />
  );

  // Mobile: full-screen
  if (!wide) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className="inset-0 h-dvh w-screen max-w-none border-0 p-0 shadow-none data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
          <div className="flex h-dvh flex-col bg-white">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <p className="text-sm font-semibold text-black">{t("title")}</p>
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

            <div className="px-4 pt-4">
              <div className="rounded-2xl bg-zinc-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {t("selectedRange")}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {from ? startText : t("placeholder")}{" "}
                  <span className="text-zinc-400">→</span>{" "}
                  {to ? endText : t("placeholder")}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-auto px-3 py-4">{calendar}</div>

            <div className="flex items-center justify-between gap-3 border-t border-black/5 p-4">
              <button
                type="button"
                className="rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
                onClick={clear}
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

  // Desktop: popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
      <PopoverContent align="start" className="p-3">
        {calendar}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-zinc-500">
            {from ? startText : t("placeholder")}{" "}
            <span className="text-zinc-300">→</span>{" "}
            {to ? endText : t("placeholder")}
          </p>
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-black hover:bg-zinc-50 transition"
            onClick={clear}
          >
            {t("clear")}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

