import type { Procedure } from "@/features/procedures/types";
import type { Therapist } from "@/features/therapist/types";

export type AppointmentStatus =
  | "OPEN"
  | "PENDING"
  | "SCHEDULED"
  | "COMPLETED"
  | "PATIENT_ABSENT"
  | "CANCELLED";

export interface AppointmentSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export interface AppointmentSlotDetails {
  id: string;
  therapist: Therapist;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  procedure: Procedure;
  isPaid: boolean;
  room: string;
  notes: string;
  medicalAdvice: string;
}
