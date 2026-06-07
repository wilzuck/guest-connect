import Image from "next/image";
import { ConversationSidebar } from "@/components/messages/ConversationSidebar";
import { ConversationView } from "@/components/messages/ConversationView";
import { Container } from "@/components/ui/Container";
import { messageThreads, threadMessages } from "@/lib/mock/messages";

export default function MessagesPage() {
  const selectedThread = messageThreads[0];

  return (
    <Container className="pb-10 sm:pb-14">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="grid h-[calc(100vh-220px)] lg:grid-cols-[360px_1fr_320px]">
          
          <ConversationSidebar
            threads={messageThreads}
            selectedId={selectedThread.id}
          />

          <ConversationView
            thread={selectedThread}
            messages={threadMessages[selectedThread.id]}
          />

          <aside className="hidden border-l border-zinc-200 p-6 lg:block">
            <Image
              src={selectedThread.coverImage}
              alt=""
              width={640}
              height={416}
              className="h-52 w-full rounded-2xl object-cover"
            />

            <h3 className="mt-5 font-semibold">
              {selectedThread.listingTitle}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Arrivée prévue • 14 Juin
            </p>

            <div className="mt-6 rounded-2xl bg-zinc-100 p-4">
              <p className="font-medium">Conseils sécurité</p>

              <p className="mt-2 text-sm text-zinc-600">
                Gardez vos échanges sur la plateforme.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </Container>
  );
}
