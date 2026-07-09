import type { Therapist } from "../types";
import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";

export const therapistService = {
  async getAllTherapists(): Promise<Therapist[]> {
    return apiClient.get<Therapist[]>(apiEndpoints.therapists.list);
  },

  async getTherapistDetails(id: string): Promise<Therapist> {
    return apiClient.get<Therapist>(apiEndpoints.therapists.details(id));
  },
};
