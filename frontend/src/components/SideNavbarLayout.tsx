import { Outlet, useNavigate } from "react-router-dom";
import { useAccountState } from "@/features/auth/context/AccountStateContext";
import { pathnames } from "@/routes/pathnames";
import { AdminRoutes, AuthRoutes, PublicRoutes } from "@/routes/routes";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
export default function SidebarLayout() {
  const { logout } = useAccountState();
  const navigate = useNavigate();

  const allAdminAllowedRoutes = [...AdminRoutes, ...AuthRoutes];
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
          Admin Panel
        </Typography>

        <List>
          {allAdminAllowedRoutes.map((route) => (
            <ListItem key={route.pathname} disablePadding>
              <ListItemButton onClick={() => navigate(route.pathname)}>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Button onClick={handleLogout} color="error" sx={{ mt: "auto", mb: 2 }}>
          Wyloguj się
        </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
