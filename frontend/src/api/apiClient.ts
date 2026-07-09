const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, config);
  if (!response.ok) {
    // todo obsługa globalnych błędów
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
    const errorText = await response.text();
    throw new Error(errorText || `Błąd HTTP: ${response.status}`);
  }
  // todo pusta w null
  if (response.status === 204) {
    return null as T;
  }
  return response.json();
}
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
