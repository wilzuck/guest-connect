import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black placeholder:text-zinc-500 shadow-sm shadow-black/5 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5",
        className,
      )}
      {...props}
    />
  );
}
