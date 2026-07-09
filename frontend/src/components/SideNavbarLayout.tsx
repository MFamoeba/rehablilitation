import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAccountState } from '@/features/auth/context/AccountStateContext';
import { pathnames } from '@/routes/pathnames';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  CssBaseline,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;
export default function SidebarLayout() {
  const { logout } = useAccountState();
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { 
      text: 'Kokpit', 
      icon: <DashboardIcon />, 
      path: '/admin/dashboard' 
    },
    { 
      text: 'Zarządzanie Grafikami', 
      icon: <CalendarMonthIcon />, 
      path: '/admin/schedule' 
    },
    { 
      text: 'Konta Użytkowników', 
      icon: <PeopleIcon />, 
      path: '/admin/accounts' 
    },
  ];
  const handleLogout = () => {
    logout();
    navigate(pathnames.unauth.login);
  };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          boxShadow: 1,
          backgroundColor: '#ffffff',
          color: '#333333',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'medium' }}>
            Panel Administracyjny
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: '1px solid #e0e0e0' 
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', backgroundColor: '#e53935', color: '#fff' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            Admin Panel
          </Typography>
        </Toolbar>
        
        <Divider />
        
        <List sx={{ px: 1, pt: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(229, 57, 53, 0.08)' : 'transparent',
                    color: isActive ? '#e53935' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(229, 57, 53, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? '#e53935' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        <Divider sx={{ my: 1 }} />
        
        <List sx={{ px: 1, mt: 'auto', mb: 2 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 2, 
                color: 'error.main',
                '&:hover': { backgroundColor: 'error.light', color: 'error.dark' }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj się" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* Zawartość Podstron */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          marginTop: '64px',
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}