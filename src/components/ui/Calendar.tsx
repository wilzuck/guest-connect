"use client";

import * as React from "react";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";
import { cn } from "@/lib/utils/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Inspiré de shadcn/ui (Calendar) — avec uniquement le nécessaire.
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        // Évite les overflows: 2 mois côte-à-côte seulement sur grands écrans.
        [UI.Months]: "flex flex-col gap-6 lg:flex-row lg:gap-6",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex items-center justify-between px-2 pt-1",
        [UI.CaptionLabel]: "text-sm font-semibold text-black",
        [UI.Nav]: "flex items-center gap-2",
        [UI.PreviousMonthButton]:
          "h-9 w-9 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition",
        [UI.NextMonthButton]:
          "h-9 w-9 rounded-xl border border-black/10 bg-white text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition",
        [UI.MonthGrid]: "w-full border-collapse space-y-1",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "w-9 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500",
        [UI.Week]: "flex w-full mt-2",
        [UI.Day]: "relative h-9 w-9 p-0 text-center text-sm",
        [UI.DayButton]: "h-9 w-9 rounded-xl p-0 font-medium text-zinc-700 hover:bg-black/5 transition",

        // Selected / range (shadcn-like)
        [SelectionState.selected]: "bg-black !text-white hover:bg-black",
        [SelectionState.range_start]: "bg-black !text-white hover:bg-black",
        [SelectionState.range_end]: "bg-black !text-white hover:bg-black",
        [SelectionState.range_middle]: "bg-black/5",

        [DayFlag.today]: "ring-2 ring-black/20",
        [DayFlag.outside]: "text-zinc-300",
        [DayFlag.disabled]: "text-zinc-300",
        ...classNames,
      }}
      {...props}
    />
  );
}
