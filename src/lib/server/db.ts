import { promises as fs } from "fs";
import path from "path";

export type DbEntity = "listings" | "categories" | "locations" | "services" | "experiences";

export type DbShape = {
  meta: { version: number; updatedAt: string };
  listings: Array<Record<string, unknown>>;
  categories: Array<Record<string, unknown>>;
  locations: Array<Record<string, unknown>>;
  services: Array<Record<string, unknown>>;
  experiences: Array<Record<string, unknown>>;
};

function dbFilePath() {
  // data/db.json à la racine du projet Next
  return path.join(process.cwd(), "data", "db.json");
}

export async function readDb(): Promise<DbShape> {
  const raw = await fs.readFile(dbFilePath(), "utf8");
  return JSON.parse(raw) as DbShape;
}

export async function writeDb(next: DbShape) {
  const file = dbFilePath();
  const updated: DbShape = {
    ...next,
    meta: {
      version: next.meta?.version ?? 1,
      updatedAt: new Date().toISOString(),
    },
  };
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(updated, null, 2), "utf8");
}

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16).slice(-4)}`;
}

export function assertEntity(entity: string): asserts entity is DbEntity {
  const ok = ["listings", "categories", "locations", "services", "experiences"].includes(entity);
  if (!ok) throw new Error("Unknown entity");
}
