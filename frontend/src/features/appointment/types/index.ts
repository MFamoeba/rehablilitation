import type { Therapist } from "@/features/therapist/types";

export type AppointmentStatus = "OPEN" | "PENDING" | "CONFIRMED" | "CANCELLED";

export interface AppointmentSlot {
  id: string;
  therapist: Therapist;
  startTime: string;
  endTime: string;
}

export interface AppointmentSlotDetails {
  id: string;
  therapist: Therapist;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  room: string;
  notes: string;
}
