import type { Therapist } from "@/features/therapist/types";

export type AppointmentStatus = "OPEN" | "PENDING" | "CONFIRMED" | "CANCELLED";

export interface AppointmentSlot {
  id: string;
  therapist: Therapist;
  startTime: string;
  endTime: string;
}
