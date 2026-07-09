export const apiEndpoints = {
  auth: {
    login: "/api/auth/authenticate",
    register: "/api/auth/register",
  },
  therapists: {
    list: "/therapist",
    details: (id: string) => `/therapist/${id}`,
  },
  appointments: {
    list: "/appointments",
    book: (id: string) => `/appointments/${id}/book`,
  },
};
