"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const themes = [
  { value: "light", icon: Sun },
  { value: "system", icon: Monitor },
  { value: "dark", icon: Moon },
] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme ?? "system" : "system";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-zinc-900 dark:shadow-none",
        className,
      )}
      aria-label="Choix du thème"
    >
      {themes.map((item) => {
        const Icon = item.icon;
        const active = currentTheme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition",
              active
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white",
            )}
            aria-pressed={active}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}