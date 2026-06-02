import { cn } from "@/lib/utils/cn";

export type FaqItem = {
  q: string;
  a: string;
};

export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5 open:shadow-md open:shadow-black/10"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="text-sm font-semibold text-black">{item.q}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-700 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-zinc-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

