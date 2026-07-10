import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { pathnames } from "./pathnames";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppointmentsPage from "../pages/AppointementsPage";
import { useAccountState } from "../features/auth/context/AccountStateContext";
import TopNavbarLayout from "@/components/TopNavbarLayout";
import SidebarLayout from "@/components/SideNavbarLayout";
import TherapistsPage from "@/pages/TherapistPage";
import TreatmentsPage from "@/pages/TreatmentsPage";

import AppointmentHistoryPage from "@/pages/AppointementHistoryPage";
import MyAccountPage from "@/pages/MyAccountPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminSchedulePage from "@/pages/AdminSchedulePage";
import AdminAccountsPage from "@/pages/AdminAccountsPage";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}
function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, parsedToken } = useAccountState();

  if (!isAuthenticated) {
    return <Navigate to={pathnames.unauth.login} replace />;
  }

  if (allowedRoles && parsedToken && !allowedRoles.includes(parsedToken.role)) {
    return <Navigate to={pathnames.public.appointmentBooking} replace />;
  }

  return <Outlet />;
}
const router = createBrowserRouter([
  {
    //public routes accessible to all users
    element: <TopNavbarLayout />,
    children: [
      {
        path: pathnames.public.appointmentBooking,
        element: <AppointmentsPage />,
      },
      {
        path: pathnames.public.therapists,
        element: <TherapistsPage />,
      },
      {
        path: pathnames.public.treatments,
        element: <TreatmentsPage />,
      },
    ],
  },
  {
    //authenticated routes accessible only to logged-in users
    element: <ProtectedRoute allowedRoles={["ROLE_USER"]} />,
    children: [
      {
        element: <TopNavbarLayout />,
        children: [
          {
            path: pathnames.auth.appiontmentHistory,
            element: <AppointmentHistoryPage />,
          },
          {
            path: pathnames.auth.myAccount,
            element: <MyAccountPage />,
          },
          {
            path: pathnames.auth.settings,
            element: <MyAccountPage />,
          },
        ],
      },
    ],
  },

  {
    //admin routes accessible only to users with ROLE_ADMIN
    element: <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]} />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          {
            path: pathnames.admin.dashboard,
            element: <AdminDashboardPage />,
          },
          {
            path: pathnames.admin.schedule,
            element: <AdminSchedulePage />,
          },
          {
            path: pathnames.admin.accounts,
            element: <AdminAccountsPage />,
          },
        ],
      },
    ],
  },
  {
    path: pathnames.unauth.login,
    element: <LoginPage />,
  },
  {
    path: pathnames.unauth.register,
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to={pathnames.public.appointmentBooking} replace />,
  },
]);
export default function RouterComponent() {
  return <RouterProvider router={router} />;
}
