"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function ScrollToTopButton({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        setVisible(window.scrollY > 500);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      title="Retour en haut"
      className={cn(
        // Desktop only
        "hidden md:grid",
        // Position
        "fixed bottom-6 right-6 z-50",
        // Style
        "h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white text-black shadow-sm shadow-black/10",
        "transition hover:bg-zinc-50 active:scale-[0.98]",
        className,
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function ArrowUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m7 10 5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

