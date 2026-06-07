import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const limitedTypes = new Set(["text", "email", "search", "tel", "url", "password"]);

export function Input({ className, type, maxLength, ...props }: InputProps) {
  const shouldLimit = !type || limitedTypes.has(type);

  return (
    <input
      type={type}
      maxLength={maxLength ?? (shouldLimit ? 250 : undefined)}
      className={cn(
        "h-11 w-full rounded-md border border-black/10 bg-white px-4 text-sm text-black placeholder:text-zinc-500 shadow-xs shadow-black/5 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5",
        className,
      )}
      {...props}
    />
  );
}
