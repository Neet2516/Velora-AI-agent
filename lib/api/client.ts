/**
 * Base API Client for Velora AI
 * Strictly conforms to /agent/API_CONTRACT.md
 */

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorBody: { error?: { code?: string; message?: string } } | null = null;
      try {
        errorBody = await response.json();
      } catch {
        // Response was not JSON
      }

      const error: ApiError = {
        code: errorBody?.error?.code || `HTTP_${response.status}`,
        message:
          errorBody?.error?.message ||
          `API request failed with HTTP ${response.status} (${response.statusText})`,
        status: response.status,
      };
      throw error;
    }

    const data = await response.json();
    return data as T;
  } catch (err: unknown) {
    if ((err as ApiError).code) {
      throw err;
    }

    const networkError: ApiError = {
      code: "NETWORK_ERROR",
      message:
        err instanceof Error
          ? err.message
          : "Unable to reach the Velora API server. Please check your network connection.",
    };
    throw networkError;
  }
}
