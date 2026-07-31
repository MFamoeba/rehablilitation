import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const publicNavItems = [
  { name: "Rezerwacja", path: pathnames.public.appointmentBooking },
  { name: "Terapeuci", path: pathnames.public.therapists },
  { name: "Zabiegi", path: pathnames.public.treatments },
];
const patientNavItems = [
  { name: "Historia Wizyt", path: pathnames.patient.appointmentHistory },
  { name: "Zaplanowane Wizyty", path: pathnames.patient.appointmentPlanned },
];
export default function TopNavbarLayout() {
  const { isAuthenticated, logout } = useAccountState();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const visibleRoutes = isAuthenticated
    ? [...publicNavItems, ...patientNavItems]
    : publicNavItems;
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate(pathnames.public.appointmentBooking);
  };
  const handleNavigate = (path: string) => {
    handleMenuClose();
    navigate(path);
  };
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", fontWeight: "bold", mr: 2 }}
            >
              Rehab-System
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: { xs: 1, md: 2 },
                ml: { xs: 1, md: 4 },
              }}
            >
              {visibleRoutes.map((route) => (
                <Button
                  key={route.path}
                  color="inherit"
                  onClick={() => navigate(route.path)}
                  sx={{ whiteSpace: "nowrap" }}
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
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenuOpen}
                >
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => handleNavigate(pathnames.auth.myAccount)}
                  >
                    Moje Konto
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate(pathnames.auth.settings)}
                  >
                    Ustawienia
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    Wyloguj
                  </MenuItem>
                </Menu>
              </Box>
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
