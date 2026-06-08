import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Spinner({ className, label = "Chargement" }: { className?: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600">
      <Loader2 className={cn("h-4 w-4 animate-spin", className)} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
