import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type { userAccountResponse, updateUserAccountRequest } from "../types";
export const authService = {
  async getMyAccount(): Promise<userAccountResponse> {
    return apiClient.get<userAccountResponse>(apiEndpoints.me.profile);
  },
  async updateMyAccount(
    request: updateUserAccountRequest,
  ): Promise<userAccountResponse> {
    return apiClient.patch<userAccountResponse>(
      apiEndpoints.me.profile,
      request,
    );
  },
  async deleteMyAccount(): Promise<void> {
    return apiClient.delete<void>(apiEndpoints.me.profile);
  },
  async getAllAccounts(): Promise<userAccountResponse[]> {
    return apiClient.get<userAccountResponse[]>(apiEndpoints.accounts.list);
  },
  async changeRoleOfAccount(
    id: string,
    request: string,
  ): Promise<userAccountResponse> {
    return apiClient.patch<userAccountResponse>(
      apiEndpoints.accounts.changeRole(id),
      request,
    );
  },
};
