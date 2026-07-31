import type { Therapist, UpdateTherapistRequest } from "../types";
import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";

export const therapistService = {
  async getAllTherapists(): Promise<Therapist[]> {
    return apiClient.get<Therapist[]>(apiEndpoints.therapists.list);
  },

  async getTherapistDetails(id: string): Promise<Therapist> {
    return apiClient.get<Therapist>(apiEndpoints.therapists.details(id));
  },

  async getMyProfile(): Promise<Therapist> {
    return apiClient.get<Therapist>(apiEndpoints.therapists.me);
  },

  async updateMyProfile(request: UpdateTherapistRequest): Promise<Therapist> {
    return apiClient.patch<Therapist>(apiEndpoints.therapists.me, request);
  },
};
