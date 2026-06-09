"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? "system";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-sm shadow-black/5",
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
              active ? "bg-black text-white" : "text-zinc-600 hover:text-black",
            )}
            aria-pressed={active}
            title={item.label}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
