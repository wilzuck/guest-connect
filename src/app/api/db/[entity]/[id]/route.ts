import { NextResponse } from "next/server";
import { assertEntity, readDb, writeDb } from "@/lib/server/db";
import { validateListingPayload } from "@/lib/server/listing-validation";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  assertEntity(entity);
  const db = await readDb();
  const arr = (db[entity] ?? []) as Array<Record<string, unknown>>;
  const found = arr.find((x) => x.id === id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  assertEntity(entity);
  const payload = (await req.json()) as Record<string, unknown>;
  const validation = entity === "listings" ? validateListingPayload(payload, "update") : { ok: true as const, data: payload };
  if (!validation.ok) return NextResponse.json({ errors: validation.errors }, { status: 400 });

  const db = await readDb();
  const arr = (db[entity] ?? []) as Array<Record<string, unknown>>;
  const idx = arr.findIndex((x) => x.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const next = { ...arr[idx], ...validation.data, id };
  const copy = [...arr];
  copy[idx] = next;
  await writeDb({ ...db, [entity]: copy });
  return NextResponse.json(next);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  assertEntity(entity);
  const db = await readDb();
  const arr = (db[entity] ?? []) as Array<Record<string, unknown>>;
  const next = arr.filter((x) => x.id !== id);
  await writeDb({ ...db, [entity]: next });
  return NextResponse.json({ ok: true });
}

