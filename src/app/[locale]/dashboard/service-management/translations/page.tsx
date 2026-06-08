import { promises as fs } from "fs";
import path from "path";
import {
  TranslationManagerClient,
  type TranslationFile,
} from "@/components/admin/translations/TranslationManagerClient";

const LOCALES = ["fr", "en"] as const;

export default async function Page() {
  const files = await getTranslationFiles();

  return <TranslationManagerClient files={files} />;
}

async function getTranslationFiles(): Promise<TranslationFile[]> {
  const messagesRoot = path.join(process.cwd(), "messages");
  const files: TranslationFile[] = [];

  for (const locale of LOCALES) {
    const rootFile = path.join(messagesRoot, `${locale}.json`);
    files.push({
      id: `${locale}:root`,
      locale,
      file: "root",
      label: `${locale}.json`,
      content: await readFormattedJson(rootFile),
    });

    const localeDir = path.join(messagesRoot, locale);
    const entries = await fs.readdir(localeDir, { withFileTypes: true }).catch(() => []);

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
      const filePath = path.join(localeDir, entry.name);
      files.push({
        id: `${locale}:${entry.name}`,
        locale,
        file: entry.name,
        label: `${locale}/${entry.name}`,
        content: await readFormattedJson(filePath),
      });
    }
  }

  return files;
}

async function readFormattedJson(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.stringify(JSON.parse(raw) as unknown, null, 2);
}
