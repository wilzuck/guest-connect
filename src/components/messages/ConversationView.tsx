"use client";

import { Send, Paperclip } from "lucide-react";

export function ConversationView({
  thread,
  messages,
}: {
  thread: {
    id: string;
    listingTitle: string;
    subject: string;
    updatedAt: string;
    lastMessage: string;
  };
  messages: Array<{
    id: string;
    from: string;
    text: string;
    time: string;
  }>;
}) {
  return (
    <section className="flex flex-col">

      <header className="border-b border-gray-200 p-5">
        <h2 className="font-semibold">
          {thread.subject}
        </h2>

        <p className="text-sm text-zinc-500">
          {thread.listingTitle}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {messages.map((msg: { id: string; from: string; text: string; time: string }) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.from === "you"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-3xl px-5 py-3 ${
                  msg.from === "you"
                    ? "bg-black text-white"
                    : "bg-zinc-100"
                }`}
              >
                <p>{msg.text}</p>

                <span className="mt-2 block text-xs opacity-70">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t p-4 border-gray-200">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">

          <button>
            <Paperclip size={18} />
          </button>

          <input
            placeholder="Écrire un message..."
            className="flex-1 outline-none"
          />

          <button className="rounded-xl bg-black p-3 text-white">
            <Send size={18} />
          </button>

        </div>
      </footer>

    </section>
  );
}