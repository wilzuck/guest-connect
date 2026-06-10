"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type PaginationProps = {
  /** Page courante (1-indexée). */
  page: number;
  /** Nombre total de pages. */
  totalPages: number;
  /** Construit l'URL d'une page donnée (mode liens, SSR-friendly). */
  hrefForPage?: (page: number) => string;
  /** Callback de changement de page (mode bouton, client). */
  onPageChange?: (page: number) => void;
  /** Nombre de pages voisines affichées autour de la page courante. */
  siblingCount?: number;
  className?: string;
};

/**
 * Pagination réutilisable avec chevrons Précédent/Suivant et numéros.
 * Couleurs et dark mode encapsulés — aucune classe de couleur à passer.
 * Fonctionne en mode liens (`hrefForPage`) ou en mode contrôlé (`onPageChange`).
 */
export function Pagination({
  page,
  totalPages,
  hrefForPage,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const t = useTranslations("pagination");

  if (totalPages <= 1) return null;

  const items = buildPageItems(page, totalPages, siblingCount);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      role="navigation"
      aria-label={t("page", { page })}
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <EdgeButton
        direction="prev"
        label={t("previous")}
        disabled={!canPrev}
        href={hrefForPage && canPrev ? hrefForPage(page - 1) : undefined}
        onClick={onPageChange && canPrev ? () => onPageChange(page - 1) : undefined}
      />

      <ul className="flex items-center gap-1">
        {items.map((item, i) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${i}`}
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center text-sm text-zinc-400 dark:text-zinc-500"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <PageButton
                page={item}
                active={item === page}
                label={t("goToPage", { page: item })}
                href={hrefForPage ? hrefForPage(item) : undefined}
                onClick={onPageChange ? () => onPageChange(item) : undefined}
              />
            </li>
          ),
        )}
      </ul>

      <EdgeButton
        direction="next"
        label={t("next")}
        disabled={!canNext}
        href={hrefForPage && canNext ? hrefForPage(page + 1) : undefined}
        onClick={onPageChange && canNext ? () => onPageChange(page + 1) : undefined}
      />
    </nav>
  );
}

function EdgeButton({
  direction,
  label,
  disabled,
  href,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const baseClass = cn(
    "inline-flex h-9 items-center gap-1 rounded-full border border-black/10 px-3 text-sm font-semibold transition dark:border-white/15",
    disabled
      ? "cursor-not-allowed text-zinc-300 dark:text-zinc-600"
      : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800",
  );

  const content =
    direction === "prev" ? (
      <>
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{label}</span>
      </>
    ) : (
      <>
        <span className="hidden sm:inline">{label}</span>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </>
    );

  if (disabled || (!href && !onClick)) {
    return (
      <span aria-disabled="true" aria-label={label} className={baseClass}>
        {content}
      </span>
    );
  }

  if (href) {
    return (
      <Link href={href} aria-label={label} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={baseClass}>
      {content}
    </button>
  );
}

function PageButton({
  page,
  active,
  label,
  href,
  onClick,
}: {
  page: number;
  active: boolean;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const className = cn(
    "grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition",
    active
      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={className}
      >
        {page}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {page}
    </button>
  );
}

/** Construit la liste de pages affichées avec ellipses (…). */
function buildPageItems(
  page: number,
  totalPages: number,
  siblingCount: number,
): Array<number | "ellipsis"> {
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 ellipses
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: Array<number | "ellipsis"> = [1];

  if (showLeftEllipsis) items.push("ellipsis");
  else for (let p = 2; p < leftSibling; p++) items.push(p);

  for (let p = leftSibling; p <= rightSibling; p++) {
    if (p !== 1 && p !== totalPages) items.push(p);
  }

  if (showRightEllipsis) items.push("ellipsis");
  else for (let p = rightSibling + 1; p < totalPages; p++) items.push(p);

  items.push(totalPages);
  return items;
}
