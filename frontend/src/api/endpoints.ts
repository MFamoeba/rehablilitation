export const apiEndpoints = {
  auth: {
    login: "/api/auth/authenticate",
    register: "/api/auth/register",
    myAccount: "/api/me",
  },
  therapists: {
    list: "/therapist",
    details: (id: string) => `/therapist/${id}`,
  },
  appointments: {
    list: (therapistId: string, localDate: string) =>
      `/appointments?therapistId=${therapistId}&localDate=${localDate}`,
    book: (id: string) => `/appointments/${id}/book`,
  },
};
