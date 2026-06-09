"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type SelectChangeEvent = {
  target: {
    value: string;
  };
};

export type SelectProps = {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  onChange?: (event: SelectChangeEvent) => void;
  onValueChange?: (value: string) => void;
};

export function Select({
  className,
  options,
  placeholder = "Sélectionner...",
  value,
  defaultValue,
  name,
  required,
  disabled,
  onChange,
  onValueChange,
  "aria-label": ariaLabel,
}: SelectProps) {
  function handleValueChange(nextValue: string) {
    onValueChange?.(nextValue);
    onChange?.({ target: { value: nextValue } });
  }

  return (
    <>
      {name ? <input type="hidden" name={name} value={value ?? defaultValue ?? ""} /> : null}
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onValueChange={handleValueChange}
      >
        <SelectPrimitive.Trigger
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl border border-black/10 bg-white px-4 text-sm text-black shadow-sm shadow-black/5 outline-none transition placeholder:text-zinc-500 focus:border-black/20 focus:ring-4 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:shadow-black/30 dark:focus:border-zinc-600 dark:focus:ring-white/10",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-[80] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-black/10 bg-white p-1 text-black shadow-xl shadow-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:shadow-black/50"
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex h-10 cursor-default select-none items-center rounded-lg py-2 pl-9 pr-3 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-900 dark:data-[highlighted]:text-white"
                >
                  <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </>
  );
}
