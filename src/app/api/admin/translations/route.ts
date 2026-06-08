import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const LOCALES = new Set(["fr", "en"]);

function resolveMessageFile(locale: string, file: string) {
  if (!LOCALES.has(locale)) throw new Error("Locale non autorisée");

  const messagesRoot = path.join(process.cwd(), "messages");
  const target =
    file === "root"
      ? path.join(messagesRoot, `${locale}.json`)
      : path.join(messagesRoot, locale, file);

  if (file !== "root" && !/^[a-zA-Z0-9_-]+\.json$/.test(file)) {
    throw new Error("Fichier non autorisé");
  }

  if (!target.startsWith(messagesRoot)) {
    throw new Error("Chemin non autorisé");
  }

  return target;
}

export async function PUT(req: Request) {
  try {
    const payload = (await req.json()) as {
      locale?: unknown;
      file?: unknown;
      content?: unknown;
    };

    if (
      typeof payload.locale !== "string" ||
      typeof payload.file !== "string" ||
      typeof payload.content !== "string"
    ) {
      return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
    }

    const parsed = JSON.parse(payload.content) as unknown;
    const target = resolveMessageFile(payload.locale, payload.file);

    await fs.access(target);
    await fs.writeFile(target, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 400 },
    );
  }
}
