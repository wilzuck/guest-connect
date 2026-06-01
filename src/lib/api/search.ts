import { apiClient } from "@/lib/api/api-client";
import type { SearchParams } from "@/types/search";
import type { Listing } from "@/types/listing";

export async function searchListings(params: SearchParams) {
  const query = new URLSearchParams();
  if (params.destination) query.set("destination", params.destination);
  if (params.checkIn) query.set("checkIn", params.checkIn);
  if (params.checkOut) query.set("checkOut", params.checkOut);
  if (typeof params.guests === "number") query.set("guests", String(params.guests));

  const qs = query.toString();
  return apiClient.get<Listing[]>(`/api/search${qs ? `?${qs}` : ""}`);
}

