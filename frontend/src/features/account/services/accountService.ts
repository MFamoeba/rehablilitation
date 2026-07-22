import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type { userAccountResponse, updateUserAccountRequest } from "../types";
export const authService = {
  async getMyAccount(): Promise<userAccountResponse> {
    return apiClient.get<userAccountResponse>(apiEndpoints.auth.myAccount);
  },
  async updateMyAccount(
    request: updateUserAccountRequest,
  ): Promise<userAccountResponse> {
    return apiClient.put<userAccountResponse>(
      apiEndpoints.auth.myAccount,
      request,
    );
  },
};
