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

function AdminDashboardPage() {
  return (
    <h2 style={{ fontFamily: "sans-serif" }}>
      Kokpit Administratora / Managera
    </h2>
  );
}
function ManageSchedulePage() {
  return (
    <h2 style={{ fontFamily: "sans-serif" }}>
      Zarządzanie Grafikami Fizjoterapeutów
    </h2>
  );
}
function ManageAccountsPage() {
  return (
    <h2 style={{ fontFamily: "sans-serif" }}>
      Zarządzanie Kontami Użytkowników
    </h2>
  );
}

interface ProtectedRouteProps {
  allowedRoles?: string[];
}
function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, parsedToken } = useAccountState();

  if (!isAuthenticated) {
    return <Navigate to={pathnames.unauth.login} replace />;
  }

  if (allowedRoles && parsedToken && !allowedRoles.includes(parsedToken.role)) {
    return <Navigate to={pathnames.unauth.appointments} replace />;
  }

  return <Outlet />;
}
const router = createBrowserRouter([
  {
    element: <TopNavbarLayout />,
    children: [
      {
        path: pathnames.unauth.appointments,
        element: <AppointmentsPage />,
      },
      {
        path: pathnames.unauth.therapists,
        element: <TherapistsPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]} />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: <AdminDashboardPage />,
          },
          {
            path: "/admin/schedule",
            element: <ManageSchedulePage />,
          },
          {
            path: "/admin/accounts",
            element: <ManageAccountsPage />,
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
    element: <Navigate to={pathnames.unauth.appointments} replace />,
  },
]);
export default function RouterComponent() {
  return <RouterProvider router={router} />;
}
