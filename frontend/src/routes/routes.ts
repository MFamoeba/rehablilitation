import type { routeType } from "../types/routeType";
import { pathnames } from "./pathnames";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppointmentsPage from "../pages/AppointementsPage";
import TherapistsPage from "@/pages/TherapistPage";
import ProceduresPage from "@/pages/ProcedurePage";
import AppointmentHistoryPage from "@/pages/AppointementHistoryPage";
import MyAccountPage from "@/pages/MyAccountPage";
import AdminAccountsPage from "@/pages/AdminAccountsPage";
import PlaceholderPage from "@/pages/PlaceHolderPage";
import TherapistAppointmentsPage from "@/pages/TherapistAppointmentsPage";
import TherapistAppointmentDetailsPage from "@/pages/TherapistAppointmentDetailsPage";
import TherapistProfilePage from "@/pages/TherapistProfilePage";
import TherapistWorkSchedulePage from "@/pages/ThreapistWorkSchedulePage";
import ProcedureEditPage from "@/pages/ProcedureEditPage";

export const SinglePageRoutes: routeType[] = [
  { pathname: pathnames.unauth.login, page: LoginPage, name: "Zaloguj się" },
  {
    pathname: pathnames.unauth.register,
    page: RegisterPage,
    name: "Rejestracja",
  },
];
export const PublicRoutes: routeType[] = [
  {
    pathname: pathnames.public.appointmentBooking,
    page: AppointmentsPage,
    name: "Rezerwacja",
  },
  {
    pathname: pathnames.public.therapists,
    page: TherapistsPage,
    name: "Terapeuci",
  },
  {
    pathname: pathnames.public.treatments,
    page: ProceduresPage,
    name: "Zabiegi",
  },
];
export const AuthRoutes: routeType[] = [
  { pathname: pathnames.auth.logout, page: PlaceholderPage, name: "Wyloguj" },
  {
    pathname: pathnames.auth.myAccount,
    page: MyAccountPage,
    name: "Moje Konto",
  },
  {
    pathname: pathnames.auth.settings,
    page: MyAccountPage,
    name: "Ustawienia",
  },
];
export const PatientRoutes: routeType[] = [
  {
    pathname: pathnames.patient.appointmentHistory,
    page: AppointmentHistoryPage,
    name: "Historia Wizyt",
  },
  {
    pathname: pathnames.patient.appointmentDetails,
    page: PlaceholderPage,
    name: "Szczegóły Wizyty",
  },
];
export const TherapistRoutes: routeType[] = [
  {
    pathname: pathnames.therapist.therapistsProfile,
    page: TherapistProfilePage,
    name: "Profil Terapeuty",
  },
  {
    pathname: pathnames.therapist.workSchedule,
    page: TherapistWorkSchedulePage,
    name: "Harmonogram Pracy",
  },
  {
    pathname: pathnames.therapist.appointmentHistory,
    page: TherapistAppointmentsPage,
    name: "Zaplanowane Wizyty",
  },
  {
    pathname: pathnames.therapist.appointmentDetails,
    page: TherapistAppointmentDetailsPage,
    name: "Szczegóły Wizyty",
  },
];
export const AdminRoutes: routeType[] = [
  {
    pathname: pathnames.admin.accounts,
    page: AdminAccountsPage,
    name: "Konta",
  },
  {
    pathname: pathnames.admin.procedures,
    page: ProcedureEditPage,
    name: "Zabiegi",
  },
];
