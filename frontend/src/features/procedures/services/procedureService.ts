import type { Procedure } from "../types";
import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import { Update } from "@mui/icons-material";

export const procedureService = {
  async getAllProcedures(): Promise<Procedure[]> {
    return apiClient.get<Procedure[]>(apiEndpoints.procedures.list);
  },

  async getProcedureDetails(id: string): Promise<Procedure> {
    return apiClient.get<Procedure>(apiEndpoints.procedures.details(id));
  },

  async updateProcedure(id: string, reqest: Procedure): Promise<Procedure> {
    return apiClient.patch<Procedure>(
      apiEndpoints.procedures.details(id),
      reqest,
    );
  },
  async addProcedure(request: Procedure): Promise<Procedure> {
    return apiClient.post<Procedure>(apiEndpoints.procedures.list, request);
  },
  async deleteProcedure(id: string): Promise<Procedure> {
    return apiClient.delete<Procedure>(apiEndpoints.procedures.details(id));
  },
};
