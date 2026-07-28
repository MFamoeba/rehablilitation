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
    appointmentDetails: "/history/:appointmentId",
  },
  therapist: {
    therapistsProfile: "/therapist/me",
    workSchedule: "/therapist/me/work-schedule",
    scheduled: "/appointments/me/scheduled",
    history: "/appointments/me/history",
    appointmentDetails: "/appointments/:appointmentId",
  },
  admin: {
    accounts: "/admin/accounts",
    procedures: "/admin/procedures",
  },
};
export const buildPatientAppointmentLink = (id: string | number) =>
  `/history/${id}`;
export const buildTherapistAppointmentLink = (id: string | number) =>
  `/appointments/${id}`;
