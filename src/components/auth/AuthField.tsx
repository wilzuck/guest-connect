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
}: AuthFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black">{label}</span>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

