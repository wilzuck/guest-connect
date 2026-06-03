import { NextResponse } from "next/server";
import { assertEntity, newId, readDb, writeDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const PREFIX: Record<string, string> = {
  listings: "lst",
  categories: "cat",
  locations: "loc",
  services: "srv",
  experiences: "exp",
};

export async function GET(_req: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  assertEntity(entity);
  const db = await readDb();
  return NextResponse.json(db[entity] ?? []);
}

export async function POST(req: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  assertEntity(entity);
  const payload = (await req.json()) as Record<string, unknown>;

  const db = await readDb();
  const arr = (db[entity] ?? []) as Array<Record<string, unknown>>;

  const item = {
    id: typeof payload.id === "string" && payload.id.trim() ? payload.id.trim() : newId(PREFIX[entity] ?? "id"),
    ...payload,
  };

  arr.push(item);
  await writeDb({ ...db, [entity]: arr });
  return NextResponse.json(item, { status: 201 });
}

