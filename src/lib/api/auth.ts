import { apiClient } from "@/lib/api/api-client";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function login(payload: LoginRequest) {
  return apiClient.post<LoginResponse>("/api/auth/login", payload);
}

/**
 * Endpoint de référence (à adapter à ton backend).
 * Non listé dans les endpoints fournis, mais utile pour la page d'inscription.
 */
export async function signup(payload: { name: string; email: string; password: string }) {
  return apiClient.post<LoginResponse>("/api/auth/signup", payload);
}
