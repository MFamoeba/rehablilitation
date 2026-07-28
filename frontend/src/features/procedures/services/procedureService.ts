import type { Procedure } from "../types";
import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";

export const procedureService = {
  async getAllProcedures(): Promise<Procedure[]> {
    return apiClient.get<Procedure[]>(apiEndpoints.procedures.list);
  },

  async getProcedureDetails(id: string): Promise<Procedure> {
    return apiClient.get<Procedure>(apiEndpoints.procedures.details(id));
  },
};
