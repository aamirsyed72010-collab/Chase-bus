"use client";

import { useAuth } from "../context/AuthContext";
import Login from "@/components/Login";
import LogoutButton from "@/components/LogoutButton";
import BusTimings, { Route } from "@/components/BusTimings";
import DynamicMap from "@/components/DynamicMap";
import Footer from "@/components/Footer";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Grid,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from "@/context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const { toggleColorMode, mode } = useThemeContext();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder route data for visualization
  const busRoutes: Route[] = [
    {
      id: 'route1',
      path: [
        [11.4531391, 79.6515867], // Bhuvanagiri
        [11.4600000, 79.6600000],
        [11.4700000, 79.6700000],
        [11.4800000, 79.6800000],
      ],
      color: 'red',
      routeName: 'Route A',
      from: 'Bhuvanagiri',
      to: 'City Center',
      eta: '10 min',
      timings: ['08:00 AM', '10:00 AM', '01:00 PM'],
      stops: ['Stop 1', 'Stop 2', 'Stop 3'],
      busType: 'Express',
    },
    {
      id: 'route2',
      path: [
        [11.4500000, 79.6500000],
        [11.4400000, 79.6400000],
        [11.4300000, 79.6300000],
      ],
      color: 'blue',
      routeName: 'Route B',
      from: 'Bhuvanagiri',
      to: 'Industrial Area',
      eta: '25 min',
      timings: ['09:30 AM', '12:30 PM', '04:30 PM'],
      stops: ['Stop A', 'Stop B'],
      busType: 'Town Bus',
    },
  ];

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Optionally, show a snackbar or alert to the user
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Optionally, show a snackbar or alert to the user
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSendNotification = () => {
    console.log("Notification clicked");
    // Implement notification logic here
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {t('busTracker')}
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {user && (
            <>
              <IconButton color="inherit" onClick={handleGetCurrentLocation}>
                <LocationOnIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleSendNotification}>
                <NotificationsIcon />
              </IconButton>
              <Button color="inherit" component={Link} href="/admin" sx={{ ml: 1 }}>
                {t('admin')}
              </Button>
              <Box sx={{ ml: 1 }}>
                <LogoutButton />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {user ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {t('welcome', { displayName: user.displayName })}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={t('searchRoutes')}
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: 'background.paper',
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  height: '500px', 
                  width: '100%', 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                }}
              >
                <ClientOnly>
                  <DynamicMap userLocation={userLocation} routes={busRoutes} />
                </ClientOnly>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <BusTimings searchQuery={searchQuery} allRoutes={busRoutes} />
            </Grid>
            {/* Google AdSense Ad Unit Placeholder */}
            <Grid size={{ xs: 12 }} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '728px',
                  height: '90px',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                  borderRadius: '12px',
                  border: '1px dashed',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2">Google AdSense Ad Unit (728x90)</Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Login />
        )}
      </Container>
      <Footer />
    </Box>
  );
}

