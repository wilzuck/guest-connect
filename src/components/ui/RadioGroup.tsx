"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  className?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export function RadioGroup({ name, options, defaultValue, className, onChange }: RadioGroupProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition hover:bg-zinc-50"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            onChange={onChange}
            className="mt-0.5 h-4 w-4 accent-black"
          />
          <span>
            <span className="block font-semibold text-black">{option.label}</span>
            {option.description ? <span className="mt-1 block text-xs text-zinc-500">{option.description}</span> : null}
          </span>
        </label>
      ))}
    </div>
  );
}
