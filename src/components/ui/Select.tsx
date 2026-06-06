import { cn } from "@/lib/utils/cn";
import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
};

export function Select({
  className,
  options,
  placeholder = "Sélectionner...",
  ...props
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-black/10 bg-white px-4 pr-10 text-sm text-black shadow-sm shadow-black/5 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5",
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* custom arrow */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}