import type { Procedure } from "@/features/procedures/types";
export interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  briefBio: string;
  fullBio: string;
  specialization: string;
  procedures: Procedure[];
}

export interface UpdateTherapistRequest {
  briefBio: string;
  fullBio: string;
  specialization: string;
  procedures: Procedure[];
}
