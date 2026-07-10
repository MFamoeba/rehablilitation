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
import AdminSchedulePage from "@/pages/AdminSchedulePage";
import AdminAccountsPage from "@/pages/AdminAccountsPage";

//todo auto generowanie przycisków w navbarze na podstawie tych tablic, żeby nie trzeba było ręcznie dodawać nowych przycisków do navbaru przy dodawaniu nowych routów
export const SinglePageRoutes: routeType[] = [
  {
    pathname: pathnames.unauth.login,
    page: LoginPage,
    name: "Login",
  },
  {
    pathname: pathnames.unauth.register,
    page: RegisterPage,
    name: "Register",
  },
];

export const PublicRoutes: routeType[] = [
  {
    pathname: pathnames.public.appointmentBooking,
    page: AppointmentsPage,
    name: "Appointments Booking",
  },
  {
    pathname: pathnames.public.therapists,
    page: TherapistsPage,
    name: "Therapists",
  },
  {
    pathname: pathnames.public.treatments,
    page: TreatmentsPage,
    name: "Treatments",
  },
];

export const AuthRoutes: routeType[] = [
  {
    pathname: pathnames.auth.appiontmentHistory,
    page: AppointmentHistoryPage,
    name: "Appointments History",
  },
  {
    pathname: pathnames.auth.myAccount,
    page: MyAccountPage,
    name: "My Account",
  },
  {
    pathname: pathnames.public.treatments,
    page: TreatmentsPage,
    name: "Treatments",
  },
];

export const AdminRoutes: routeType[] = [
  {
    pathname: pathnames.admin.dashboard,
    page: AdminDashboardPage,
    name: "Admin Dashboard",
  },
  {
    pathname: pathnames.admin.schedule,
    page: AdminSchedulePage,
    name: "Admin Schedule",
  },
  {
    pathname: pathnames.admin.accounts,
    page: AdminAccountsPage,
    name: "Admin Accounts",
  },
];
