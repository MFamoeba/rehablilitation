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
export default function TopNavbarLayout() {
  const { isAuthenticated, logout } = useAccountState();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate(pathnames.unauth.login);
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
            {isAuthenticated && (
              <Box sx={{ display: "flex", gap: 2, ml: 4, flexGrow: 1 }}>
                <Button
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => navigate(pathnames.unauth.appointments)}
                  sx={{
                    color:
                      location.pathname === pathnames.unauth.appointments
                        ? "#1976d2"
                        : "inherit",
                    fontWeight:
                      location.pathname === pathnames.unauth.appointments
                        ? "bold"
                        : "normal",
                  }}
                >
                  Moje Wizyty
                </Button>
              </Box>
            )}
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
