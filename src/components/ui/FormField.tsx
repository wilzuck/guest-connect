import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type FormFieldProps = PropsWithChildren<{
  label?: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}>;

export function FormField({ label, error, hint, required = false, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-semibold text-black">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
