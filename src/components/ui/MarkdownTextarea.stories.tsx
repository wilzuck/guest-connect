"use client";

import { useState } from "react";
import { MarkdownTextarea } from "./MarkdownTextarea";

const meta = {
  title: "Atoms/MarkdownTextarea",
  component: MarkdownTextarea,
};

export default meta;

export function ElasticEditor() {
  const [value, setValue] = useState(
    "Appartement lumineux proche du centre.\n- Parking privé\n- WiFi rapide",
  );

  return (
    <div className="max-w-xl">
      <MarkdownTextarea
        value={value}
        onChange={setValue}
        placeholder="Décrivez le logement, les règles et les points forts..."
      />
    </div>
  );
}
