import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type {
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest,
} from "../types";
export const authService = {
  async login(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    return apiClient.post<AuthenticationResponse>(
      apiEndpoints.auth.login,
      request,
    );
  },
  async register(request: RegisterRequest): Promise<AuthenticationResponse> {
    return apiClient.post<AuthenticationResponse>(
      apiEndpoints.auth.register,
      request,
    );
  },
  logout(): void {
    localStorage.removeItem("token");
  },
  getToken(): string | null {
    return localStorage.getItem("token");
  },
};
