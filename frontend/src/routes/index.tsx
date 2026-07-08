import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { pathnames } from "./pathnames";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppointmentsPage from "../pages/AppointementsPage";
import { useAuth } from "../features/auth/context/AuthContext";


function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={pathnames.unauth.login} replace />;
  }

  return <Outlet />;
}


const router = createBrowserRouter([
  // Trasy publiczne (dostępne dla każdego)
  {
    path: pathnames.unauth.login,
    element: <LoginPage />,
  },
  {
    path: pathnames.unauth.register,
    element: <RegisterPage />,
  },

  // prywatna sciezka do appointments po zalogowaniu, tylko tymczasowo 
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: pathnames.auth.appointments,
        element: <AppointmentsPage />,
      },
    ],
  },

  // nie autoryzowany próbuje linki wkleppywać
  {
    path: "*",
    element: <Navigate to={pathnames.unauth.login} replace />,
  },
]);

export default function RouterComponent() {
  return <RouterProvider router={router} />;
}