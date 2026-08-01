import { apiClient } from "@/api/apiClient";
import { apiEndpoints } from "@/api/endpoints";
import type {
  AppointmentSlot,
  AppointmentSlotDetails,
  BookRequest,
  UpdateAppointmentSlotDetails,
} from "../types";

export const appointmentService = {
  async getAppointmentSlotsForDate(
    therapistId: string,
    localDate: string,
  ): Promise<AppointmentSlot[]> {
    return apiClient.get<AppointmentSlot[]>(
      apiEndpoints.appointments.listAvailalble(therapistId, localDate),
    );
  },

  async bookAppointmentSlot(
    slotId: string,
    request: BookRequest,
  ): Promise<AppointmentSlot> {
    return apiClient.post<AppointmentSlot>(
      apiEndpoints.appointments.book(slotId),
      request,
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

  async getAppointmentDetails(
    appointmentId: string,
  ): Promise<AppointmentSlotDetails> {
    return apiClient.get<AppointmentSlotDetails>(
      apiEndpoints.appointments.details(appointmentId),
    );
  },

  async updateAppointmentDetails(
    appointmentId: string,
    updatedData: UpdateAppointmentSlotDetails,
  ): Promise<AppointmentSlotDetails> {
    return apiClient.put<AppointmentSlotDetails>(
      apiEndpoints.appointments.update(appointmentId),
      updatedData,
    );
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    return apiClient.patch<void>(
      apiEndpoints.appointments.cancel(appointmentId),
      {},
    );
  },

  async deleteAppointment(appointmentId: string): Promise<void> {
    return apiClient.delete<void>(
      apiEndpoints.appointments.delete(appointmentId),
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
