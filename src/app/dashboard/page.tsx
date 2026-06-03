import { redirect } from "next/navigation";

export default function DashboardRedirect() {
  redirect("/fr/dashboard");
  return null;
}

