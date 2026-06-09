"use client";

import {
  Archive,
  Ban,
  CheckCheck,
  FileImage,
  ImagePlus,
  Link2,
  Mail,
  MoreHorizontal,
  Paperclip,
  Phone,
  Reply,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  Unlock,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export type InboxMessage = {
  id: string;
  author: string;
  role?: string;
  body: string;
  time: string;
  mine?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: "image" | "file";
    url?: string;
  }>;
  replyTo?: string;
};

export type InboxConversation = {
  id: string;
  title: string;
  subtitle: string;
  participantName: string;
  participantRole?: string;
  groupName?: string;
  group?: boolean;
  lastMessage: string;
  updatedAt: string;
  unreadCount?: number;
  archived?: boolean;
  blocked?: boolean;
  active?: boolean;
  status?: "open" | "pending" | "closed";
  messages: InboxMessage[];
};

type InboxMode = "user" | "admin";

export function MessagesInbox({
  title = "Messages",
  description,
  conversations,
  mode = "user",
  emptyLabel = "Aucune conversation trouvée.",
  state = "ready",
  errorLabel = "Impossible de charger les conversations.",
  withTopBorder = true,
  withBottomBorder = true,
  withLeftBorder = true,
  withRightBorder = true,
}: {
  title?: string;
  description?: string;
  conversations: InboxConversation[];
  mode?: InboxMode;
  emptyLabel?: string;
  state?: "ready" | "loading" | "error";
  errorLabel?: string;
  withTopBorder?: boolean;
  withBottomBorder?: boolean;
  withLeftBorder?: boolean;
  withRightBorder?: boolean;
}) {
  const [items, setItems] = useState(conversations);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<InboxMessage | null>(null);
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; type: "image" | "file" }>>([]);
  const [mobilePanel, setMobilePanel] = useState<"list" | "chat">("list");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!q) return true;
      return `${item.title} ${item.subtitle} ${item.participantName} ${item.groupName ?? ""} ${item.lastMessage}`
        .toLowerCase()
        .includes(q);
    });
  }, [items, query]);

  const selected = items.find((item) => item.id === selectedId) ?? filtered[0] ?? items[0];
  const visibleMessages = selected?.messages ?? [];

  if (state === "loading") {
    return (
      <section
        className={cn(
          "grid h-[calc(100dvh-4rem)] min-h-[680px] place-items-center border-b border-black/10 bg-white dark:border-zinc-800 dark:bg-black",
          withTopBorder ? "border-t" : "border-t-0",
          withBottomBorder ? "border-b" : "border-b-0",
          withLeftBorder ? "border-l" : "border-l-0",
          withRightBorder ? "border-r" : "border-r-0",
        )}
      >
        <div className="text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-black/5  dark:border-black/10 border-t-[#05A6D6]" />
          <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-white">Chargement des conversations...</p>
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section
        className={cn(
          "grid h-[calc(100dvh-4rem)] min-h-[680px] place-items-center border-black/10 bg-white dark:border-zinc-800 dark:bg-black",
           withTopBorder ? "border-t" : "border-t-0",
          withBottomBorder ? "border-b" : "border-b-0",
          withLeftBorder ? "border-l" : "border-l-0",
          withRightBorder ? "border-r" : "border-r-0",
        )}
      >
        <EmptyState label={errorLabel} />
      </section>
    );
  }

  function updateSelectedConversation(update: (conversation: InboxConversation) => InboxConversation) {
    if (!selected) return;
    setItems((current) => current.map((item) => (item.id === selected.id ? update(item) : item)));
  }

  function sendMessage() {
    const body = draft.trim();
    if (!selected || (!body && attachments.length === 0)) return;

    const nextMessage: InboxMessage = {
      id: `local-${Date.now()}`,
      author: mode === "admin" ? "Admin GuestConnect" : "Vous",
      role: mode === "admin" ? "Support" : "Voyageur",
      body: body || "Pièce jointe envoyée.",
      time: "Maintenant",
      mine: true,
      replyTo: replyTo?.body,
      attachments,
    };

    updateSelectedConversation((conversation) => ({
      ...conversation,
      lastMessage: nextMessage.body,
      updatedAt: "Maintenant",
      unreadCount: 0,
      messages: [...conversation.messages, nextMessage],
    }));
    setDraft("");
    setReplyTo(null);
    setAttachments([]);
    if (composerRef.current) {
      composerRef.current.style.height = "40px";
    }
  }

  function selectConversation(id: string) {
    setSelectedId(id);
    setMobilePanel("chat");
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, unreadCount: 0 } : item)),
    );
  }

  function removeConversation(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    if (selected?.id === id) {
      const next = items.find((item) => item.id !== id);
      setSelectedId(next?.id ?? "");
      setMobilePanel("list");
    }
  }

  function addAttachments(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).slice(0, 4).map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      type: file.type.startsWith("image/") ? ("image" as const) : ("file" as const),
    }));
    setAttachments((current) => [...current, ...next].slice(0, 6));
  }

  function resizeComposer(element: HTMLTextAreaElement) {
    element.style.height = "40px";
    element.style.height = `${Math.min(element.scrollHeight, 160)}px`;
  }

  return (
    <section
      className={cn(
        "h-[calc(100dvh-4rem)] min-h-[680px] overflow-hidden border border-black/5  dark:border-black/10 bg-white dark:border-zinc-800 dark:bg-black",
        withTopBorder ? "border-t" : "border-t-0",
        withBottomBorder ? "border-b" : "border-b-0",
        withLeftBorder ? "border-l" : "border-l-0",
        withRightBorder ? "border-r" : "border-r-0",
      )}
    >
      <div className="grid h-full lg:grid-cols-[248px_360px_minmax(0,1fr)]">
        <aside className="hidden border-r border-black/5  dark:border-black/10 bg-[#F7F7F8] dark:border-zinc-800 dark:bg-zinc-950 lg:flex lg:flex-col">
          <div className="border-b border-black/5  dark:border-black/10 p-4 dark:border-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8E8E93] dark:text-zinc-500">
              {mode === "admin" ? "Centre support" : "Espace"}
            </p>
            <h1 className="mt-2 text-lg font-semibold text-[#202024] dark:text-white">{title}</h1>
            {description ? <p className="mt-1 text-xs leading-5 text-[#8E8E93] dark:text-zinc-400">{description}</p> : null}
          </div>

          <nav className="grid gap-1 p-3 text-sm">
            <SidebarItem active icon={Mail} label="Messages" count={unreadTotal(items)} />
            <SidebarItem icon={Reply} label="Réponses" />
            <SidebarItem icon={Archive} label="Archivées" count={items.filter((item) => item.archived).length} />
            <SidebarItem icon={Users} label="Groupes" count={items.filter((item) => item.group).length} />
          </nav>

          <div className="mt-auto border-t border-black/5  dark:border-black/10 p-4 dark:border-zinc-800">
            <div className="rounded-2xl border border-black/5  dark:border-black/10 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs font-semibold text-[#202024] dark:text-white">
                {mode === "admin" ? "Messages utilisateurs" : "Besoin d'aide ?"}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#8E8E93] dark:text-zinc-400">
                {mode === "admin"
                  ? "Répondez à une personne ou à un groupe depuis le même espace."
                  : "Gardez les échanges et les fichiers dans GuestConnect."}
              </p>
            </div>
          </div>
        </aside>

        <section
          className={cn(
            "flex min-w-0 flex-col border-r border-black/5  dark:border-black/10 bg-white dark:border-zinc-800 dark:bg-black",
            mobilePanel === "chat" && "hidden lg:flex",
          )}
        >
          <div className="border-b border-black/5  dark:border-black/10 p-3 dark:border-zinc-800">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-black/5  dark:border-black/10 bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-black/30">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une conversation..."
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7] dark:placeholder:text-zinc-500"
              />
            </label>
          </div>

          <div className="flex items-center gap-2 border-b border-black/5  dark:border-black/10 px-3 py-2 text-xs font-medium text-[#73737A] dark:border-zinc-800 dark:text-zinc-400">
            <button className="rounded-full bg-[#EAF8FF] px-3 py-1.5 text-[#0789C8] dark:bg-sky-950/50 dark:text-sky-300">Messages</button>
            <button className="rounded-full px-3 py-1.5 hover:bg-[#F7F7F8]">Brouillons</button>
            <button className="rounded-full px-3 py-1.5 hover:bg-[#F7F7F8]">Archivés</button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => selectConversation(conversation.id)}
                  className={cn(
                    "flex w-full gap-3 border-b border-[#EFEFF2] px-4 py-3 text-left transition hover:bg-[#F7F7F8] dark:border-zinc-800 dark:hover:bg-zinc-950",
                    selected?.id === conversation.id && "bg-[#EAF8FF] dark:bg-sky-950/40",
                  )}
                >
                  <Avatar name={conversation.participantName} group={conversation.group} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-white">
                        {conversation.participantName}
                      </span>
                      {conversation.group ? <Users className="h-3.5 w-3.5 text-[#0789C8]" aria-hidden="true" /> : null}
                      <span className="ml-auto shrink-0 text-xs text-[#8E8E93] dark:text-zinc-500">{conversation.updatedAt}</span>
                    </span>
                    <span className="mt-1 block truncate text-xs font-medium text-[#0789C8]">{conversation.title}</span>
                    <span className="mt-1 block truncate text-xs text-[#73737A] dark:text-zinc-400">{conversation.lastMessage}</span>
                  </span>
                  {conversation.unreadCount ? (
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black text-[11px] font-bold text-white">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </button>
              ))
            ) : (
              <EmptyState label={emptyLabel} />
            )}
          </div>
        </section>

        <section
          className={cn(
            "min-w-0 flex-col bg-white dark:bg-black lg:flex",
            mobilePanel === "list" ? "hidden lg:flex" : "flex",
          )}
        >
          {selected ? (
            <>
              <header className="flex h-16 items-center gap-3 border-b border-black/5  dark:border-black/10 px-4 dark:border-zinc-800">
                <button
                  type="button"
                  className="rounded-lg border border-black/5  dark:border-black/10 px-3 py-2 text-xs font-semibold text-[#73737A] dark:border-zinc-800 dark:text-zinc-300 lg:hidden"
                  onClick={() => setMobilePanel("list")}
                >
                  Retour
                </button>
                <Avatar name={selected.participantName} group={selected.group} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-white">{selected.title}</p>
                  <p className="truncate text-xs text-[#8E8E93] dark:text-zinc-400">
                    {selected.group ? selected.groupName : selected.participantName} • {selected.subtitle}
                  </p>
                </div>
                <ConversationStatus conversation={selected} />
              </header>

              <div className="flex overflow-auto items-center gap-1 border-b border-black/5  dark:border-black/10 px-4 py-2 dark:border-zinc-800">
                <ToolbarButton icon={Reply} label="Répondre" onClick={() => setReplyTo(visibleMessages.at(-1) ?? null)} />
                <ToolbarButton
                  icon={selected.archived ? Mail : Archive}
                  label={selected.archived ? "Désarchiver" : "Archiver"}
                  onClick={() => updateSelectedConversation((item) => ({ ...item, archived: !item.archived }))}
                />
                <ToolbarButton
                  icon={selected.blocked ? Unlock : Ban}
                  label={selected.blocked ? "Débloquer" : "Bloquer"}
                  onClick={() => updateSelectedConversation((item) => ({ ...item, blocked: !item.blocked }))}
                />
               
                <ToolbarButton
                  icon={CheckCheck}
                  label={selected.unreadCount ? "Marquer lu" : "Non lu"}
                  onClick={() =>
                    updateSelectedConversation((item) => ({
                      ...item,
                      unreadCount: item.unreadCount ? 0 : 1,
                    }))
                  }
                />
                <ToolbarButton icon={Trash2} label="Supprimer" tone="danger" onClick={() => removeConversation(selected.id)} />
                
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#FAFAFB] px-4 py-5 dark:bg-zinc-950">
                <div className="mx-auto grid max-w-4xl gap-4">
                  {visibleMessages.length > 0 ? (
                    visibleMessages.map((message) => (
                      <MessageBubble key={message.id} message={message} onReply={() => setReplyTo(message)} />
                    ))
                  ) : (
                    <EmptyState label="Aucun message dans cette conversation." />
                  )}
                </div>
              </div>

              <footer className="border-t border-black/5  dark:border-black/10 bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-zinc-800 dark:bg-black">
                {replyTo ? (
                  <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#F7F7F8] px-3 py-2 text-xs text-[#73737A] dark:bg-zinc-900 dark:text-zinc-300">
                    <Reply className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">Réponse à : {replyTo.body}</span>
                    <button type="button" className="font-semibold text-[#202024] dark:text-white" onClick={() => setReplyTo(null)}>
                      Annuler
                    </button>
                  </div>
                ) : null}

                {attachments.length > 0 ? (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {attachments.map((file) => (
                      <span
                        key={file.id}
                        className="inline-flex items-center gap-2 rounded-full bg-[#F7F7F8] px-3 py-1.5 text-xs font-medium text-[#5F5F66] dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {file.type === "image" ? <ImagePlus className="h-3.5 w-3.5" /> : <FileImage className="h-3.5 w-3.5" />}
                        {file.name}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-end gap-2 rounded-2xl border border-black/5  dark:border-black/10 bg-white p-2 shadow-xs shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(event) => addAttachments(event.target.files)}
                  />
                  <button
                    type="button"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#73737A] hover:bg-[#F7F7F8] dark:text-zinc-400 dark:hover:bg-zinc-900"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Ajouter un fichier"
                  >
                    <Paperclip className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <textarea
                    ref={composerRef}
                    value={draft}
                    onChange={(event) => {
                      setDraft(event.target.value);
                      resizeComposer(event.currentTarget);
                    }}
                    rows={1}
                    placeholder={selected.blocked ? "Utilisateur bloqué" : "Écrire un message..."}
                    disabled={selected.blocked || selected.active === false}
                    className="max-h-40 min-h-10 flex-1 resize-none overflow-y-auto bg-transparent px-1 py-2 text-sm text-[#202024] outline-none placeholder:text-[#B1B1B7] disabled:cursor-not-allowed dark:text-white dark:placeholder:text-zinc-500"
                  />
                  <button
                    type="button"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#05A6D6] text-white transition hover:bg-[#0789C8] disabled:opacity-50"
                    onClick={sendMessage}
                    disabled={selected.blocked || selected.active === false || (!draft.trim() && attachments.length === 0)}
                    aria-label="Envoyer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <EmptyState label={emptyLabel} />
          )}
        </section>
      </div>
    </section>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  count,
}: {
  icon: typeof Mail;
  label: string;
  active?: boolean;
  count?: number;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 items-center gap-3 rounded-lg px-3 text-left font-medium transition",
        active ? "bg-white text-[#202024] shadow-sm shadow-black/[0.04] dark:bg-zinc-900 dark:text-white dark:shadow-black/30" : "text-[#73737A] hover:bg-white dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count ? (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-black px-1.5 text-[11px] font-bold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  tone = "default",
  onClick,
}: {
  icon: typeof Reply;
  label: string;
  tone?: "default" | "danger";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-lg border border-transparent px-2.5 text-xs font-semibold transition hover:border-black/5  dark:border-black/10 hover:bg-[#F7F7F8] dark:hover:border-zinc-800 dark:hover:bg-zinc-900",
        tone === "danger" ? "text-[#E04F5F] dark:text-red-300" : "text-[#5F5F66] dark:text-zinc-300",
      )}
      title={label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}

function MessageBubble({ message, onReply }: { message: InboxMessage; onReply: () => void }) {
  return (
    <article className={cn("flex gap-3", message.mine && "justify-end")}>
      {!message.mine ? <Avatar name={message.author} /> : null}
      <div className={cn("max-w-[min(720px,86%)]", message.mine && "text-right")}>
        <div className="mb-1 flex items-center gap-2 text-xs text-[#8E8E93] dark:text-zinc-500">
          <span className="font-semibold text-[#5F5F66] dark:text-zinc-300">{message.author}</span>
          {message.role ? <span>{message.role}</span> : null}
          <span>{message.time}</span>
        </div>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-6 shadow-xs shadow-black/5",
            message.mine ? "bg-[#05A6D6] text-white" : "bg-white text-[#202024] dark:bg-zinc-900 dark:text-zinc-100",
          )}
        >
          {message.replyTo ? (
            <p className={cn("mb-2 border-l-2 pl-2 text-xs", message.mine ? "border-white/50 text-white/75" : "border-[#05A6D6] text-[#73737A] dark:text-zinc-400")}>
              {message.replyTo}
            </p>
          ) : null}
          <p>{message.body}</p>
          {message.attachments?.length ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {message.attachments.map((file) => (
                <span
                  key={file.id}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium",
                    message.mine ? "bg-white/15 text-white" : "bg-[#F7F7F8] text-[#5F5F66] dark:bg-zinc-950 dark:text-zinc-300",
                  )}
                >
                  {file.type === "image" ? <ImagePlus className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                  {file.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onReply}
          className="mt-1 text-xs font-semibold text-[#8E8E93] hover:text-[#202024] dark:text-zinc-500 dark:hover:text-white"
        >
          Répondre
        </button>
      </div>
    </article>
  );
}

function Avatar({ name, group }: { name: string; group?: boolean }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold",
        group ? "bg-[#EAF8FF] text-[#0789C8] dark:bg-sky-950/50 dark:text-sky-300" : "bg-[#F2F2F3] text-[#5F5F66] dark:bg-zinc-900 dark:text-zinc-300",
      )}
    >
      {group ? <Users className="h-4 w-4" aria-hidden="true" /> : initials}
    </span>
  );
}

function ConversationStatus({ conversation }: { conversation: InboxConversation }) {
  const status = conversation.blocked
    ? "Bloqué"
    : conversation.active === false
      ? "Désactivé"
      : conversation.status === "closed"
        ? "Fermé"
        : conversation.status === "pending"
          ? "En attente"
          : "Ouvert";

  const className = conversation.blocked
    ? "bg-[#FDECEF] text-[#B42336]"
    : conversation.active === false
      ? "bg-[#F7F7F8] text-[#73737A] dark:bg-zinc-900 dark:text-zinc-300"
      : "bg-[#EAF8F6] text-[#188C7F] dark:bg-emerald-950/40 dark:text-emerald-300";

  return <span className={cn("hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex", className)}>{status}</span>;
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid h-full min-h-64 place-items-center p-8 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#F7F7F8] text-[#8E8E93] dark:bg-zinc-900 dark:text-zinc-400">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 dark:text-white">{label}</p>
        <p className="mt-1 text-sm text-[#8E8E93]">Les nouveaux échanges apparaîtront ici.</p>
      </div>
    </div>
  );
}

function unreadTotal(items: InboxConversation[]) {
  return items.reduce((total, item) => total + (item.unreadCount ?? 0), 0);
}
