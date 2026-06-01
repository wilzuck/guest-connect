export type ApiClientOptions = {
  /**
   * Base URL du backend. Exemple: https://api.guestconnect.com
   * - côté client: NEXT_PUBLIC_API_BASE_URL
   * - côté serveur: API_BASE_URL
   */
  baseUrl?: string;
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function resolveBaseUrl(explicitBaseUrl?: string) {
  return (
    explicitBaseUrl ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    ""
  );
}

async function parseJsonSafe(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return undefined;

  try {
    return await res.json();
  } catch {
    return undefined;
  }
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = resolveBaseUrl(options.baseUrl);

  async function request<T>(
    path: string,
    init: RequestInit & { json?: unknown } = {},
  ): Promise<T> {
    const { json, headers, ...rest } = init;

    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
      ...rest,
      headers: {
        ...(json ? { "content-type": "application/json" } : {}),
        ...(options.headers || {}),
        ...(headers || {}),
      },
      body: json ? JSON.stringify(json) : rest.body,
    });

    if (!res.ok) {
      const body = await parseJsonSafe(res);
      throw new ApiError(`API request failed: ${res.status}`, res.status, body);
    }

    const body = await parseJsonSafe(res);
    return body as T;
  }

  return {
    get: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...(init || {}), method: "GET" }),
    post: <T>(path: string, json?: unknown, init?: RequestInit) =>
      request<T>(path, { ...(init || {}), method: "POST", json }),
  };
}

export const apiClient = createApiClient();

