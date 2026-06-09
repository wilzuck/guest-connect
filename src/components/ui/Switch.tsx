"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Switch({ className, label, ...props }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 text-sm font-medium text-black dark:text-white", className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="relative h-6 w-11 rounded-full bg-zinc-200 transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:bg-black peer-checked:after:translate-x-5 peer-focus:ring-4 peer-focus:ring-black/5 dark:bg-zinc-800 dark:after:bg-zinc-200 dark:peer-checked:bg-white dark:peer-focus:ring-white/10" />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
