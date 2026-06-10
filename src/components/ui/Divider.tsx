import { cn } from "@/lib/utils/cn";

type DividerProps = {
  className?: string;
  vertical?: boolean;
};

export default function Divider({
  className,
  vertical = false,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        vertical
          ? "h-10 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800"
          : "h-px w-full bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
    />
  );
}