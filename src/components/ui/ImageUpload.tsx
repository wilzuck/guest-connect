"use client";

import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Card } from "./Card";

type ImageUploadProps = {
  onFilesSelected?: (files: File[]) => void;
  onPreviewsChange?: (previews: string[]) => void;
  maxFiles?: number;
  maxSizeInMB?: number;
  className?: string;
};

export function ImageUpload({
  onFilesSelected,
  onPreviewsChange,
  maxFiles = 5,
  maxSizeInMB = 10,
  className,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): File[] => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Seules les images sont acceptées");
        continue;
      }

      if (file.size > maxSizeInBytes) {
        setError(`Fichier trop volumineux (max ${maxSizeInMB}MB)`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles.slice(0, maxFiles - previews.length);
  };

  const handleFiles = useCallback((files: File[]) => {
    const validFiles = validateFiles(files);

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...previews, ...newPreviews];

    setPreviews(updatedPreviews);
    onPreviewsChange?.(updatedPreviews);
    onFilesSelected?.(validFiles);
    setError(null);
  }, [previews, maxFiles, maxSizeInMB, onFilesSelected, onPreviewsChange]);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const removePreview = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onPreviewsChange?.(newPreviews);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Zone de drag & drop */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition",
          dragActive
            ? "border-black bg-black/5"
            : "border-black/20 bg-zinc-50 hover:border-black/30",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <svg
            className="h-8 w-8 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-semibold text-black">
            Glissez vos images ici ou cliquez
          </p>
          <p className="text-xs text-zinc-500">
            PNG, JPG ou GIF (max {maxSizeInMB}MB)
          </p>
        </div>
      </div>

      {/* Messages d'erreur */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Galerie de prévisualisation */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {previews.map((preview, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-0 hover:shadow-md"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => removePreview(index)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13l-.867 12.142A2 2 0 0116.138 27H7.862a2 2 0 01-1.995-1.858L5 13m5 0V7a1 1 0 011-1h2a1 1 0 011 1v6m0 0v6"
                  />
                </svg>
              </button>
              <span className="absolute bottom-1 right-1 inline-flex items-center rounded-lg bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                {index + 1}
              </span>
            </Card>
          ))}
        </div>
      )}

      {/* Indicateur de limite */}
      {previews.length > 0 && (
        <p className="text-xs text-zinc-500">
          {previews.length} / {maxFiles} images
        </p>
      )}
    </div>
  );
}
