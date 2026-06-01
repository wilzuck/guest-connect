import { cn } from "@/lib/utils/cn";
import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-500 shadow-sm shadow-black/5 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5",
        className,
      )}
      {...props}
    />
  );
}

