"use client";

import { useState } from "react";
import { Select } from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
};

export default meta;

const options = [
  { value: "apartment", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
];

export function ShadcnLikeSelect() {
  const [value, setValue] = useState("apartment");

  return (
    <div className="max-w-sm">
      <Select
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Type de propriété"
      />
    </div>
  );
}
