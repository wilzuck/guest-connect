import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({
    token: "demo-google-token",
    user: {
      id: "usr-google-demo",
      name: "Utilisateur Google",
      email: "google.user@guestconnect.com",
    },
  });
}
