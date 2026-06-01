import { apiClient } from "@/lib/api/api-client";
import type { Listing } from "@/types/listing";

export async function getListings() {
  return apiClient.get<Listing[]>("/api/listings");
}

