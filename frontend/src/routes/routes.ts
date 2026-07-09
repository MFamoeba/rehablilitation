import type { routeType } from "../types/routeType";
import { pathnames } from "./pathnames";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppointmentsPage from "../pages/AppointementsPage";
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
  {
    pathname: pathnames.unauth.appointments,
    page: AppointmentsPage,
    name: "Appointments",
  },
];
