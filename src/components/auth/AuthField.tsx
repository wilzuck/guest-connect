"use client";

import { Input } from "@/components/ui/Input";

type AuthFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  rightElement?: React.ReactNode;
};

export function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  value,
  onChange,
  rightElement,
}: AuthFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black">{label}</span>
      <div className="relative">
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={rightElement ? "pr-12" : undefined}
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">{rightElement}</div>
        ) : null}
      </div>
    </label>
  );
}
