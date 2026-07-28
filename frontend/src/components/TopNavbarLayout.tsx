import { Outlet, useNavigate } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import { PublicRoutes, AuthRoutes } from "@/routes/routes";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";

const publicNavItems = [
  { name: "Rezerwacja", path: pathnames.public.appointmentBooking },
  { name: "Terapeuci", path: pathnames.public.therapists },
  { name: "Zabiegi", path: pathnames.public.treatments },
];

const patientNavItems = [
  { name: "Historia Wizyt", path: pathnames.patient.appointmentHistory },
  { name: "Moje Konto", path: pathnames.auth.myAccount },
  { name: "Ustawienia", path: pathnames.auth.settings },
];

export default function TopNavbarLayout() {
  const { isAuthenticated, logout } = useAccountState();
  const navigate = useNavigate();
  const visibleRoutes = isAuthenticated
    ? [...publicNavItems, ...patientNavItems]
    : publicNavItems;
  const handleLogout = () => {
    logout();
    navigate(pathnames.public.appointmentBooking);
  };
  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Rehab-System
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", gap: 2, ml: 4 }}>
              {visibleRoutes.map((route) => (
                <Button
                  key={route.path}
                  color="inherit"
                  onClick={() => navigate(route.path)}
                >
                  {route.name}
                </Button>
              ))}
            </Box>
            {!isAuthenticated ? (
              <Box>
                <Button
                  color="inherit"
                  onClick={() => navigate(pathnames.unauth.login)}
                >
                  Zaloguj
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate(pathnames.unauth.register)}
                >
                  Rejestracja
                </Button>
              </Box>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Wyloguj
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
