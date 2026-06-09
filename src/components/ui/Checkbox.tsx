"use client";

import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 text-sm font-medium text-black dark:text-white", className)}>
      <span className="relative grid h-5 w-5 place-items-center">
        <input
          type="checkbox"
          className="peer h-5 w-5 appearance-none rounded-md border border-black/15 bg-white shadow-sm outline-none transition checked:border-black checked:bg-black focus:ring-4 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-950 dark:checked:border-white dark:checked:bg-white dark:focus:ring-white/10"
          {...props}
        />
        <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:dark:text-black" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
