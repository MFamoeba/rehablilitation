import type { basicUserDto } from "@/features/account/types";
import type { Procedure } from "@/features/procedures/types";
import type { Therapist } from "@/features/therapist/types";

export type AppointmentStatus =
  | "OPEN"
  | "PENDING"
  | "SCHEDULED"
  | "COMPLETED"
  | "PATIENT_ABSENT";

export interface AppointmentSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export interface BookRequest {
  procedureId: string;
}

export interface AppointmentSlotDetails {
  id: string;
  patient: basicUserDto;
  therapist: basicUserDto;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  procedureName: String;
  isPaid: boolean;
  notes: string;
  medicalAdvice: string;
}
