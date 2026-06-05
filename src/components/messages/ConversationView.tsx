"use client";

// Inline SVG icons are used here to avoid adding a dedicated icon library.

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
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M21.44 11.05 12.37 20.12a5.5 5.5 0 0 1-7.78 0 5.5 5.5 0 0 1 0-7.78l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95L11.5 17.5a2.5 2.5 0 0 1-3.54 0 2.5 2.5 0 0 1 0-3.54l7.07-7.07" />
            </svg>
          </button>

          <input
            placeholder="Écrire un message..."
            className="flex-1 outline-none"
          />

          <button className="rounded-xl bg-black p-3 text-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>

        </div>
      </footer>

    </section>
  );
}