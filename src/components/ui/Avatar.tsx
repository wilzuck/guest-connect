import { cn } from "@/lib/utils/cn";

type AvatarSize = "sm" | "md" | "lg";

const sizes: Record<AvatarSize, string> = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type AvatarProps = {
  name: string;
  size?: AvatarSize;
  className?: string;
};

/** Initials avatar — coherent light/dark, used for hosts and reviewers. */
export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-zinc-900 font-semibold text-white dark:bg-white dark:text-black",
        sizes[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
