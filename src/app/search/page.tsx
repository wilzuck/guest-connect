import { redirect } from "next/navigation";

export default function SearchPage() {
  // Route non-localisée : redirige vers /fr/search
  redirect("/fr/search");
  return null;
}
