import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";

import {
  People,
  MedicalServices,
  Person,
  CalendarMonth,
  History,
  AccountCircle,
  Settings,
  Logout,
} from "@mui/icons-material";
const adminNavItems = [
  {
    name: "Konta użytkowników",
    path: pathnames.admin.accounts,
    icon: <People />,
  },
  {
    name: "Zabiegi",
    path: pathnames.admin.procedures,
    icon: <MedicalServices />,
  },
];
const doctorNavItems = [
  {
    name: "Mój Profil",
    path: pathnames.therapist.therapistsProfile,
    icon: <Person />,
  },
  {
    name: "Harmonogram Pracy",
    path: pathnames.therapist.workSchedule,
    icon: <CalendarMonth />,
  },
  {
    name: "Wizyty",
    path: pathnames.therapist.appointmentHistory,
    icon: <History />,
  },
];
const getNavConfig = (role?: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return { items: adminNavItems, title: "Panel Admina" };
    case "ROLE_DOCTOR":
      return { items: doctorNavItems, title: "Panel Lekarza" };
    default:
      return { items: [], title: "Twój Panel" };
  }
};
export default function SidebarLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, parsedToken } = useAccountState();
  const { items: navItems, title: panelTitle } = getNavConfig(
    parsedToken?.role,
  );
  const handleLogout = () => {
    logout();
    navigate(pathnames.unauth.login);
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            p: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            letterSpacing: 0.5,
          }}
        >
          {panelTitle}
        </Typography>

        <Divider />
        <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname == item.path;

            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                    color: isActive ? "primary.main" : "text.primary",
                    "&:hover": {
                      bgcolor: isActive
                        ? alpha(theme.palette.primary.main, 0.15)
                        : alpha(theme.palette.action.hover, 0.5),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ p: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <List disablePadding>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(pathnames.auth.myAccount)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Moje Konto" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ mb: 2 }}>
              <ListItemButton
                onClick={() => navigate(pathnames.auth.settings)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Ustawienia" />
              </ListItemButton>
            </ListItem>
          </List>
          <Button
            onClick={handleLogout}
            color="inherit"
            variant="text"
            startIcon={<Logout />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              px: 2,
              py: 1,
              color: "text.secondary",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            Wyloguj się
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f9fafb" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
