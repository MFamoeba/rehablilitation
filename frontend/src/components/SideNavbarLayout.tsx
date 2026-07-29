import { Outlet, useNavigate } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const adminNavItems = [
  { name: "Konta użytkowników", path: pathnames.admin.accounts },
  { name: "Zabiegi", path: pathnames.admin.procedures },
];

const doctorNavItems = [
  { name: "Mój Profil", path: pathnames.therapist.therapistsProfile },
  { name: "Harmonogram Pracy", path: pathnames.therapist.workSchedule },
  { name: "Wizyty", path: pathnames.therapist.appointmentHistory },
];

//const managerNavItems = [{ name: "Panel Managera", path: pathnames.manager.dashboard }, ];

const getNavConfig = (role?: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return { items: adminNavItems, title: "Panel Admina" };
    // case "ROLE_MANAGER":
    //    return { items: managerNavItems, title: "Panel Managera" };
    case "ROLE_DOCTOR":
      return { items: doctorNavItems, title: "Panel Lekarza" };
    default:
      return { items: [], title: "Twój Panel" };
  }
};
export default function SidebarLayout() {
  const { logout, parsedToken } = useAccountState();
  const navigate = useNavigate();
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
        sx={{ width: 240, "& .MuiDrawer-paper": { width: 240 } }}
      >
        <Typography
          variant="h6"
          sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
        >
          {panelTitle}
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(pathnames.auth.myAccount)}>
              <ListItemText primary="Moje Konto" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(pathnames.auth.settings)}>
              <ListItemText primary="Ustawienia" />
            </ListItemButton>
          </ListItem>
        </List>
        <Button onClick={handleLogout} color="error" sx={{ mt: "auto", mb: 2 }}>
          Wyloguj się
        </Button>
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
