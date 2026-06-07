"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Bold, Eye, Italic, List, Pencil, Quote } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type MarkdownTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
};

const actions = [
  { label: "Gras", icon: Bold, before: "**", after: "**" },
  { label: "Italique", icon: Italic, before: "_", after: "_" },
  { label: "Liste", icon: List, before: "- ", after: "" },
  { label: "Citation", icon: Quote, before: "> ", after: "" },
] as const;

export function MarkdownTextarea({
  value,
  onChange,
  placeholder,
  maxLength = 700,
  className,
}: MarkdownTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [preview, value]);

  function updateValue(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value.slice(0, maxLength));
  }

  function wrapSelection(before: string, after: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next.slice(0, maxLength));

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm shadow-black/5", className)}>
      <div className="flex items-center justify-between border-b border-black/5 bg-zinc-50 px-2 py-2">
        <div className="flex items-center gap-1">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => wrapSelection(action.before, action.after)}
                className="grid h-8 w-8 place-items-center rounded-lg text-zinc-600 transition hover:bg-white hover:text-black"
                aria-label={action.label}
                title={action.label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPreview((current) => !current)}
          className="inline-flex h-8 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-zinc-600 transition hover:bg-white hover:text-black"
        >
          {preview ? <Pencil className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {preview ? "Écrire" : "Aperçu"}
        </button>
      </div>

      {preview ? (
        <div className="min-h-[140px] px-4 py-3 text-sm leading-7 text-zinc-700">
          <MarkdownPreview value={value || placeholder || ""} muted={!value} />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={updateValue}
          placeholder={placeholder}
          rows={4}
          className="block min-h-[140px] w-full resize-none overflow-hidden bg-white px-4 py-3 text-sm leading-7 text-black outline-none placeholder:text-zinc-400"
        />
      )}

      <div className="flex items-center justify-between border-t border-black/5 px-4 py-2 text-xs text-zinc-400">
        <span>Markdown accepté : **gras**, _italique_, listes</span>
        <span>
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}

function MarkdownPreview({ value, muted = false }: { value: string; muted?: boolean }) {
  const lines = value.split("\n").filter((line) => line.trim().length > 0);

  if (!lines.length) return <p className="text-zinc-400">Aucun contenu à prévisualiser.</p>;

  return (
    <div className={cn("space-y-2", muted && "text-zinc-400")}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("- ")) {
          return (
            <p key={`${line}-${index}`} className="pl-4 before:mr-2 before:content-['•']">
              {renderInline(trimmed.slice(2))}
            </p>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={`${line}-${index}`} className="border-l-2 border-black/20 pl-3 text-zinc-600">
              {renderInline(trimmed.slice(2))}
            </blockquote>
          );
        }
        return <p key={`${line}-${index}`}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}
