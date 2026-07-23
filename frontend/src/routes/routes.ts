import type { routeType } from "../types/routeType";
import { pathnames } from "./pathnames";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppointmentsPage from "../pages/AppointementsPage";
import TherapistsPage from "@/pages/TherapistPage";
import TreatmentsPage from "@/pages/TreatmentsPage";
import AppointmentHistoryPage from "@/pages/AppointementHistoryPage";
import MyAccountPage from "@/pages/MyAccountPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminAccountsPage from "@/pages/AdminAccountsPage";

// Single Page Routes (Logowanie/Rejestracja)
export const SinglePageRoutes: routeType[] = [
  { pathname: pathnames.unauth.login, page: LoginPage, name: "Zaloguj się" },
  {
    pathname: pathnames.unauth.register,
    page: RegisterPage,
    name: "Rejestracja",
  },
];
// Publiczne (Dla wszystkich, np. niezalogowanych użytkowników)
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
    page: TreatmentsPage,
    name: "Zabiegi",
  },
];
// AUTORYZOWANE (Dla zalogowanych Pacjentów/Lekarzy)
export const AuthRoutes: routeType[] = [
  {
    pathname: pathnames.auth.appiontmentHistory,
    page: AppointmentHistoryPage,
    name: "Historia Wizyt",
  },
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
// ADMINISTRACYJNE (Dla zalogowanych administratorów)
export const AdminRoutes: routeType[] = [
  {
    pathname: pathnames.admin.dashboard,
    page: AdminDashboardPage,
    name: "Panel Główny",
  },
  {
    pathname: pathnames.admin.accounts,
    page: AdminAccountsPage,
    name: "Konta",
  },
];
