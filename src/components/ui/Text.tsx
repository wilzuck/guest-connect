import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Composants typographiques réutilisables.
 *
 * Objectif : centraliser les couleurs de texte ET le dark mode pour ne plus
 * avoir à écrire `text-zinc-900 dark:text-white` à la main sur chaque page.
 * Choisissez un `tone` sémantique, la couleur claire/sombre est gérée ici.
 */

type Tone =
  | "default" // texte principal
  | "muted" // texte secondaire
  | "subtle" // texte tertiaire (légendes, hints)
  | "inverted" // sur fond sombre/coloré
  | "brand"
  | "danger"
  | "success";

const toneClass: Record<Tone, string> = {
  default: "text-zinc-900 dark:text-zinc-50",
  muted: "text-zinc-600 dark:text-zinc-300",
  subtle: "text-zinc-500 dark:text-zinc-400",
  inverted: "text-white",
  brand: "text-indigo-600 dark:text-indigo-400",
  danger: "text-red-600 dark:text-red-400",
  success: "text-emerald-600 dark:text-emerald-400",
};

const sizeClass = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

const weightClass = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

type TextProps = {
  as?: ElementType;
  tone?: Tone;
  size?: keyof typeof sizeClass;
  weight?: keyof typeof weightClass;
  className?: string;
  children: ReactNode;
};

export function Text({
  as: Tag = "p",
  tone = "default",
  size = "base",
  weight = "normal",
  className,
  children,
}: TextProps) {
  return (
    <Tag className={cn(toneClass[tone], sizeClass[size], weightClass[weight], className)}>
      {children}
    </Tag>
  );
}

const headingSize = {
  1: "text-4xl sm:text-5xl",
  2: "text-3xl sm:text-4xl",
  3: "text-2xl sm:text-3xl",
  4: "text-xl sm:text-2xl",
  5: "text-lg sm:text-xl",
  6: "text-base sm:text-lg",
} as const;

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: ElementType;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Heading({
  level = 2,
  as,
  tone = "default",
  className,
  children,
}: HeadingProps) {
  const Tag = (as ?? (`h${level}` as ElementType)) as ElementType;
  return (
    <Tag
      className={cn(
        "text-balance font-semibold tracking-tight",
        headingSize[level],
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Petit label "eyebrow" en capitales au-dessus d'un titre de section. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
