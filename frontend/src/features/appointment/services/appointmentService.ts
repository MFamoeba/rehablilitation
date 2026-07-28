import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type { AppointmentSlot } from "../types";

export const appointmentService = {
  async getAppointmentSlotsForDate(
    therapistId: string,
    localDate: string,
  ): Promise<AppointmentSlot[]> {
    return apiClient.get<AppointmentSlot[]>(
      apiEndpoints.appointments.listAvailalble(therapistId, localDate),
    );
  },

  async bookAppointmentSlot(slotId: string): Promise<AppointmentSlot> {
    return apiClient.post<AppointmentSlot>(
      apiEndpoints.appointments.book(slotId),
      {},
    );
  },

  async getMyAppointmentHistory(): Promise<AppointmentSlot[]> {
    return apiClient.get<AppointmentSlot[]>(
      apiEndpoints.appointments.myHistory,
    );
  },
};
