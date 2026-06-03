import { redirect } from "next/navigation";

export default function PricingRedirect() {
  redirect("/fr/pricing");
  return null;
}

