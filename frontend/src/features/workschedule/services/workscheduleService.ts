import { apiClient } from "@/api/apiClient";
import type { WorkScheduleItemDto } from "../types";
import { apiEndpoints } from "@/api/endpoints";

export const therapistService = {
  async getMyWorkSchedule(): Promise<WorkScheduleItemDto[]> {
    return apiClient.get<WorkScheduleItemDto[]>(
      apiEndpoints.schedules.myDefault,
    );
  },
  async addNewWorkSchedule(
    request: WorkScheduleItemDto[],
  ): Promise<WorkScheduleItemDto[]> {
    return apiClient.put<WorkScheduleItemDto[]>(
      apiEndpoints.schedules.myDefault,
      request,
    );
  },
};
