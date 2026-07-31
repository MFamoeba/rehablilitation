import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type { AppointmentSlot, AppointmentSlotDetails } from "../types";

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

  async getMyAppointmentHistory(): Promise<AppointmentSlotDetails[]> {
    return apiClient.get<AppointmentSlotDetails[]>(
      apiEndpoints.appointments.myHistory,
    );
  },
  async getMyPlannedAppointmets(): Promise<AppointmentSlotDetails[]> {
    return apiClient.get<AppointmentSlotDetails[]>(
      apiEndpoints.appointments.myPlanned,
    );
  },

  async getMyScheduledAppointmentsForDate(
    localDate: string,
  ): Promise<AppointmentSlotDetails[]> {
    return apiClient.get<AppointmentSlotDetails[]>(
      apiEndpoints.appointments.myScheduled(localDate),
    );
  },
};
