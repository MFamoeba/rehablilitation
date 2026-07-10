import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
export default function TopNavbarLayout() {
  const { isAuthenticated, logout } = useAccountState();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate(pathnames.public.appointmentBooking);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", color: "#333333", boxShadow: 1 }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate("/")}
              sx={{ fontWeight: "bold", color: "#1976d2", cursor: "pointer" }}
            >
              Rehab-System
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, ml: 4, flexGrow: 1 }}>
              <Button
                startIcon={<CalendarMonthIcon />}
                onClick={() => navigate(pathnames.public.appointmentBooking)}
                sx={{
                  color:
                    location.pathname === pathnames.public.appointmentBooking
                      ? "#1976d2"
                      : "inherit",
                  fontWeight:
                    location.pathname === pathnames.public.appointmentBooking
                      ? "bold"
                      : "normal",
                }}
              >
                Umów się
              </Button>
              <Button
                startIcon={<MedicalServicesIcon />}
                onClick={() => navigate(pathnames.public.therapists)}
                sx={{
                  color:
                    location.pathname === pathnames.public.therapists
                      ? "#1976d2"
                      : "inherit",
                  fontWeight:
                    location.pathname === pathnames.public.therapists
                      ? "bold"
                      : "normal",
                }}
              >
                Terapeuci
              </Button>
              <Button
                startIcon={<HealingIcon />}
                onClick={() => navigate(pathnames.public.treatments)}
                sx={{
                  color:
                    location.pathname === pathnames.public.treatments
                      ? "#1976d2"
                      : "inherit",
                  fontWeight:
                    location.pathname === pathnames.public.treatments
                      ? "bold"
                      : "normal",
                }}
              >
                Zabiegi
              </Button>
              {/* DODATKOWE PRZYCISKI DLA ZALOGOWANEGO UŻYTKOWNIKA */}
              {isAuthenticated && (
                <>
                  <Button
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate(pathnames.auth.appiontmentHistory)}
                    sx={{
                      color:
                        location.pathname === pathnames.auth.appiontmentHistory
                          ? "#1976d2"
                          : "inherit",
                      fontWeight:
                        location.pathname === pathnames.auth.appiontmentHistory
                          ? "bold"
                          : "normal",
                    }}
                  >
                    Historia wizyt
                  </Button>
                  <Button
                    startIcon={<PersonIcon />}
                    onClick={() => navigate(pathnames.auth.myAccount)}
                    sx={{
                      color:
                        location.pathname === pathnames.auth.myAccount
                          ? "#1976d2"
                          : "inherit",
                      fontWeight:
                        location.pathname === pathnames.auth.myAccount
                          ? "bold"
                          : "normal",
                    }}
                  >
                    Moje konto
                  </Button>
                  <Button
                    startIcon={<SettingsIcon />}
                    onClick={() => navigate(pathnames.auth.settings)}
                    sx={{
                      color:
                        location.pathname === pathnames.auth.settings
                          ? "#1976d2"
                          : "inherit",
                      fontWeight:
                        location.pathname === pathnames.auth.settings
                          ? "bold"
                          : "normal",
                    }}
                  >
                    Ustawienia
                  </Button>
                </>
              )}
            </Box>
            {!isAuthenticated ? (
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button
                  startIcon={<LoginIcon />}
                  onClick={() => navigate(pathnames.unauth.login)}
                  variant="outlined"
                  size="small"
                >
                  Zaloguj się
                </Button>
                <Button
                  startIcon={<PersonAddIcon />}
                  onClick={() => navigate(pathnames.unauth.register)}
                  variant="contained"
                  size="small"
                >
                  Zarejestruj się
                </Button>
              </Box>
            ) : (
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                variant="text"
                color="error"
                size="small"
              >
                Wyloguj się
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
