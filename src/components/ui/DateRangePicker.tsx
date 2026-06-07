"use client";

import { format, isValid, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/lib/utils/cn";
import { Calendar1, CalendarCheck, Users } from "lucide-react";

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
  size?: "md" | "sm";
  fieldVariant?: "plain" | "bordered";
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

export function DateRangePicker({
  value,
  onChange,
  startLabel,
  endLabel,
  className,
  size = "md",
  fieldVariant = "plain",
}: DateRangePickerProps) {
  const locale = useLocale();
  const t = useTranslations("dateRangePicker");
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 640px)").matches;
  });

  // Mobile-first : plein écran. Dès sm, popover.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const fromProp = toDate(value?.from);
  const toProp = toDate(value?.to);

  const from = fromProp;
  const to = toProp;
  const selected = useMemo(() => ({ from, to }), [from, to]);

  function setRange(nextFrom?: Date, nextTo?: Date) {
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
    "grid grid-cols-1 gap-2 sm:grid-cols-2",
    className,
  )}
>
  {/* START DATE */}
  <button
    type="button"
    className={cn(
      "group w-full rounded-2xl bg-white text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5",
      fieldVariant === "bordered" ? "border border-black/10" : "",
      size === "sm" ? "h-12 px-3 py-2" : "h-14 p-[10px]",
    )}
    aria-label={startLabel}
  >
    <div className="flex items-start gap-3">
      <Calendar1 className="h-4 w-4 md:hidden lg:block text-zinc-400 shrink-0" />

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {startLabel}
        </p>
        <p
          className={cn(
            "mt-1 truncate text-sm font-semibold",
            from ? "text-black" : "text-zinc-500",
          )}
        >
          {startText}
        </p>
      </div>
    </div>
  </button>

  {/* END / USERS */}
  <button
    type="button"
    className={cn(
      "group w-full rounded-2xl bg-white text-left transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-black/5",
      fieldVariant === "bordered" ? "border border-black/10" : "",
      size === "sm" ? "h-12 px-3 py-2" : "h-14 p-[10px]",
    )}
    aria-label={endLabel}
  >
    <div className="flex items-start gap-3">
      <Calendar1 className="h-4 w-4 md:hidden lg:block text-zinc-400 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {endLabel}
        </p>
        <p
          className={cn(
            "mt-1 truncate text-sm font-semibold",
            to ? "text-black" : "text-zinc-500",
          )}
        >
          {endText}
        </p>
      </div>
    </div>
  </button>
</div>
  );

  const calendar = (
    <Calendar
      mode="range"
      selected={selected}
      onDayClick={onDayClick}
      weekStartsOn={1}
      locale={locale === "en" ? enUS : fr}
      numberOfMonths={wide ? 2 : 1}
      showOutsideDays
      fixedWeeks
      className={cn("bg-white", wide ? "relative w-max pt-2" : "")}
      classNames={
        wide
          ? {
              months: "flex flex-row gap-6",
              nav: "absolute left-2 right-2 top-2 flex items-center justify-between pointer-events-none",
              button_previous:
                "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 transition hover:bg-zinc-50",
              button_next:
                "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 transition hover:bg-zinc-50",
              month_caption: "flex items-center justify-center px-2 pt-1",
            }
          : undefined
      }
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
      <PopoverContent side="top" align="start" className="p-3">
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
