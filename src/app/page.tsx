"use client";

import { useAuth } from "../context/AuthContext";
import Login from "@/components/Login";
import LogoutButton from "@/components/LogoutButton";
import BusTimings from "@/components/BusTimings";
import { busRoutes } from "@/data/routes";
import DynamicMap from "@/components/DynamicMap";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";
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
  Autocomplete,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import RoutePlanner from "@/components/RoutePlanner";
import { useTranslation } from 'react-i18next';
import '@/i18n/config'; // Ensure i18n is initialized
import { useThemeContext } from "@/context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import { ADMIN_EMAIL } from "@/config/constants";

export default function Home() {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const { toggleColorMode, mode } = useThemeContext();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusTypes, setSelectedBusTypes] = useState<string[]>(['All']);
  const [sortBy, setSortBy] = useState<'eta' | 'name' | 'distance'>('name');

  // Route data imported from @/data/routes

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
    <LiquidBackground>
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
                {user.email === ADMIN_EMAIL && (
                  <Button color="inherit" component={Link} href="/admin" sx={{ ml: 1 }}>
                    {t('admin')}
                  </Button>
                )}
                <Button color="inherit" component={Link} href="/profile" sx={{ ml: 1 }}>
                  Profile
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
              <Autocomplete
                freeSolo
                options={busRoutes.map(route => ({
                  label: `${route.routeName}: ${route.from} → ${route.to}`,
                  value: route.routeName,
                  route: route
                }))}
                value={searchQuery}
                onInputChange={(_, newValue) => setSearchQuery(newValue || '')}
                onChange={(_, option) => {
                  if (option && typeof option !== 'string') {
                    setSearchQuery(option.value);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label={t('searchRoutes')}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        bgcolor: 'background.paper',
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.route.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <Typography variant="body1">{option.route.routeName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.route.from} → {option.route.to} • {option.route.busType}
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
              </Grid>
              
              {/* Filters and Sort */}
              <Grid size={{ xs: 12 }} sx={{ mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, maxWidth: '100%' }}>
                    {['All', 'Express', 'Town Bus', 'Deluxe'].map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        onClick={() => {
                          if (type === 'All') {
                            setSelectedBusTypes(['All']);
                          } else {
                            const newTypes = selectedBusTypes.includes('All') 
                              ? [type] 
                              : selectedBusTypes.includes(type)
                                ? selectedBusTypes.filter(t => t !== type)
                                : [...selectedBusTypes, type];
                            
                            setSelectedBusTypes(newTypes.length ? newTypes : ['All']);
                          }
                        }}
                        color={selectedBusTypes.includes(type) ? "primary" : "default"}
                        variant={selectedBusTypes.includes(type) ? "filled" : "outlined"}
                        sx={{ borderRadius: '12px' }}
                      />
                    ))}
                  </Stack>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>{t('sortBy')}</InputLabel>
                    <Select
                      value={sortBy}
                      label={t('sortBy')}
                      onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as 'eta' | 'name' | 'distance')}
                      sx={{ borderRadius: '12px', bgcolor: 'background.paper' }}
                    >
                      <MenuItem value="eta">{t('eta')}</MenuItem>
                      <MenuItem value="name">{t('name')}</MenuItem>
                      <MenuItem value="distance">{t('distance')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Box sx={{ mt: 2 }}>
                <RoutePlanner />
              </Box>
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
                <BusTimings 
                  searchQuery={searchQuery} 
                  allRoutes={busRoutes}
                  selectedBusTypes={selectedBusTypes}
                  sortBy={sortBy}
                  userLocation={userLocation}
                />
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
    </LiquidBackground>
  );
}

