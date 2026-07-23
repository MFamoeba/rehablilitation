import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { pathnames } from "./pathnames";
import {
  SinglePageRoutes,
  PublicRoutes,
  AuthRoutes,
  AdminRoutes,
} from "./routes";
import { useAccountState } from "../features/auth/context/AccountStateContext";
import TopNavbarLayout from "@/components/TopNavbarLayout";
import SidebarLayout from "@/components/SideNavbarLayout";
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, parsedToken } = useAccountState();
  if (!isAuthenticated) return <Navigate to={pathnames.unauth.login} replace />;
  if (allowedRoles && parsedToken && !allowedRoles.includes(parsedToken.role)) {
    return <Navigate to={pathnames.public.appointmentBooking} replace />;
  }

  return <Outlet />;
}

//Dynamic Layout based on user role
function RoleBasedLayout() {
  const { parsedToken } = useAccountState();
  if (
    parsedToken?.role === "ROLE_ADMIN" ||
    parsedToken?.role === "ROLE_MANAGER"
  ) {
    return <SidebarLayout />;
  }

  return <TopNavbarLayout />;
}
const router = createBrowserRouter([
  {
    element: <RoleBasedLayout />,
    children: [
      // PUBLIC ROUTES (Accessible to everyone, including unauthenticated users)
      ...PublicRoutes.map((route) => ({
        path: route.pathname,
        element: <route.page />,
      })),

      // AUTHENTICATED ROUTES (Accessible to logged-in users)
      {
        element: <ProtectedRoute />,
        children: AuthRoutes.map((route) => ({
          path: route.pathname,
          element: <route.page />,
        })),
      },
      // ADMIN
      {
        element: <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />,
        children: AdminRoutes.map((route) => ({
          path: route.pathname,
          element: <route.page />,
        })),
      },
    ],
  },
  // SINGLE PAGE ROUTES (Login/Register)
  ...SinglePageRoutes.map((route) => ({
    path: route.pathname,
    element: <route.page />,
  })),
  // Catch-all
  {
    path: "*",
    element: <Navigate to={pathnames.public.appointmentBooking} replace />,
  },
]);
export default function RouterComponent() {
  return <RouterProvider router={router} />;
}
