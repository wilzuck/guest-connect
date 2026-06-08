import type { ReactNode } from "react";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
      {items.map((item) => (
        <details key={item.title} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-black">
            {item.title}
            <span className="text-lg leading-none text-zinc-400 transition group-open:rotate-45">+</span>
          </summary>
          <div className="px-4 pb-4 text-sm leading-6 text-zinc-600">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
