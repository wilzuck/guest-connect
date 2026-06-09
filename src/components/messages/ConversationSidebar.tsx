"use client";

import Image from "next/image";
import Link from "next/link";

export function ConversationSidebar({
  threads,
  selectedId,
}: {
  threads: Array<{
    id: string;
    coverImage: string;
    unread: number;
    subject: string;
    updatedAt: string;
    lastMessage: string;
  }>;
  selectedId: string | null;
}) {
  return (
    <aside className="border-r border-black/10 bg-white dark:border-zinc-800 dark:bg-black">
      
      <div className="border-b border-gray-200 p-4 dark:border-zinc-800">
        <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3 h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            placeholder="Rechercher"
            className="w-full bg-transparent text-black outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-24">
        {threads.map((thread) => (
          <Link
            key={thread.id}
            href={`/messages/${thread.id}`}
            className={`flex gap-4 p-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
              selectedId === thread.id
                ? "bg-zinc-100 dark:bg-zinc-900"
                : ""
            }`}
          >
            <div className="relative">
              <Image
                src={thread.coverImage}
                alt=""
                width={64}
                height={64}
                className="rounded-2xl object-cover"
              />

              {thread.unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {thread.unread}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex justify-between">
                <p className="truncate font-medium text-black dark:text-white">
                  {thread.subject}
                </p>

                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {thread.updatedAt}
                </span>
              </div>

              <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                {thread.lastMessage}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
