export const apiEndpoints = {
  auth: {
    login: "/api/auth/authenticate",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },
  me: {
    profile: "/api/me",
  },
  accounts: {
    list: "/api/accounts",
    details: (id: string) => `/api/accounts/${id}`,
    changeRole: (id: string) => `/api/accounts/${id}`,
  },
  schedules: {
    myDefault: "/schedules/default",
  },
  therapists: {
    list: "/therapist",
    details: (id: string) => `/therapist/${id}`,
  },
  procedures: {
    list: "/procedures",
    details: (id: string) => `/procedures/${id}`,
  },
  appointments: {
    listAvailalble: (therapistId: string, localDate: string) =>
      `/appointments/available?therapistId=${therapistId}&localDate=${localDate}`,
    book: (id: string) => `/appointments/${id}/book`,
    myHistory: "/appointments/me/history",
    details: (id: string) => `/appointments/${id}`,
    // Doctor endpoints
    myScheduled: (startDate: string) =>
      `/appointments/me/scheduled?startDate=${startDate}`,
    generate: (startDate: string, endDate: string) =>
      `/appointments/me/generate?startDate=${startDate}&endDate=${endDate}`,
    patientHistory: (patientId: string) =>
      `/appointments/patient/${patientId}/history`,
    update: (id: string) => `/appointments/${id}`,
    delete: (id: string) => `/appointments/${id}`,
  },
};
