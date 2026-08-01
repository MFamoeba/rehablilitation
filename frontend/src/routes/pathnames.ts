export const pathnames = {
  unauth: {
    login: "/login",
    register: "/register",
  },
  auth: {
    logout: "/logout",
    myAccount: "/account",
    settings: "/settings",
  },
  public: {
    appointmentBooking: "/",
    therapists: "/therapist",
    treatments: "/treatments",
  },
  patient: {
    appointmentHistory: "/history",
    appointmentPlanned: "/planned",
    appointmentDetails: "/history/:appointmentId",
  },
  therapist: {
    therapistsProfile: "/therapist/me",
    workSchedule: "/therapist/me/work-schedule",
    appointmentHistory: "/appointments/me/history/:appointmentDate?",
    appointmentDetails: "/appointments/:appointmentId",
  },
  admin: {
    accounts: "/admin/accounts",
    procedures: "/admin/procedures",
  },
};
export const buildPatientAppointmentLink = (id: string) => `/history/${id}`;
export const buildTherapistAppointmentLink = (id: string) =>
  `/appointments/${id}`;
export const buildTherapistAppointementListLink = (appointmentDate?: string) =>
  appointmentDate
    ? `/appointments/me/history/${appointmentDate}`
    : "/appointments/me/history";
