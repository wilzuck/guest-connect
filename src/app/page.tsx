import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/fr");
  return null;
}
