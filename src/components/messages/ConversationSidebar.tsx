"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

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
    <aside className="border-r border-zinc-200">
      
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center rounded-2xl border border-gray-200 px-4 py-3">
          <Search className="mr-3 h-4 w-4" />

          <input
            placeholder="Rechercher"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-24">
        {threads.map((thread) => (
          <Link
            key={thread.id}
            href={`/messages/${thread.id}`}
            className={`flex gap-4 p-4 transition hover:bg-zinc-50 ${
              selectedId === thread.id
                ? "bg-zinc-100"
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
                <p className="truncate font-medium">
                  {thread.subject}
                </p>

                <span className="text-xs text-zinc-500">
                  {thread.updatedAt}
                </span>
              </div>

              <p className="truncate text-sm text-zinc-500">
                {thread.lastMessage}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}