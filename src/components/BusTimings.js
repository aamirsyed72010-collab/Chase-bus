"use client";

import { Card, CardContent, Typography, Grid, CircularProgress, Box, Stack, Divider, IconButton } from '@mui/material'; // Import IconButton
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import filled favorite icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import outlined favorite icon

export default function BusTimings({ searchQuery, allRoutes }) {
  const { t } = useTranslation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteRoutes, setFavoriteRoutes] = useState({}); // State to store favorite routes

  useEffect(() => {
    // Load favorite routes from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteRoutes');
    if (storedFavorites) {
      setFavoriteRoutes(JSON.parse(storedFavorites));
    }

    const fetchBusTimings = async () => {
      try {
        if (allRoutes) {
          setRoutes(allRoutes);
        } else {
          const response = await fetch('/api/bus-timings');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setRoutes(data.routes);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusTimings();
  }, [allRoutes]);

  // Save favorite routes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteRoutes', JSON.stringify(favoriteRoutes));
  }, [favoriteRoutes]);

  const toggleFavorite = (routeId) => {
    setFavoriteRoutes((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[routeId]) {
        delete newFavorites[routeId];
      } else {
        newFavorites[routeId] = true;
      }
      return newFavorites;
    });
  };

  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="error">{t('failedToFetchBusTimings')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        {t('busTimingsForBhuvanagiri')}
      </Typography>
      <Grid container spacing={3}>
        {filteredRoutes.map((route) => (
          <Grid xs={12} sm={6} md={4} key={route.id}> {/* Use route.id for key */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {route.routeName}: {route.from} to {route.to}
                  </Typography>
                  <IconButton onClick={() => toggleFavorite(route.id)} size="small" color="primary">
                    {favoriteRoutes[route.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
                {route.eta && ( // Display ETA if available
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ETA: {route.eta}
                  </Typography>
                )}
                <Divider sx={{ my: 1 }} />
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {route.timings.map((timing) => (
                    <Typography key={timing} variant="h5" color="primary">
                      {timing}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
