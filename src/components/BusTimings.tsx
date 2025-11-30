"use client";

import { CardContent, Typography, Grid, CircularProgress, Box, Stack, Divider, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Route } from '@/data/routes';
import LiquidCard from './LiquidCard';

interface BusTimingsProps {
    searchQuery: string;
    allRoutes?: Route[];
}

export default function BusTimings({ searchQuery, allRoutes }: BusTimingsProps) {
    const { t } = useTranslation();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [favoriteRoutes, setFavoriteRoutes] = useState<Record<string, boolean>>({});

    useEffect(() => {
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

    useEffect(() => {
        localStorage.setItem('favoriteRoutes', JSON.stringify(favoriteRoutes));
    }, [favoriteRoutes]);

    const toggleFavorite = (routeId: string) => {
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
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
                {t('busTimingsForBhuvanagiri')}
            </Typography>
            <Grid container spacing={3}>
                {filteredRoutes.map((route, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={route.id}>
                        <LiquidCard delay={index * 0.1} elevation={2}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {route.routeName}: {route.from} to {route.to}
                                    </Typography>
                                    <IconButton onClick={() => toggleFavorite(route.id)} size="small" color="primary">
                                        {favoriteRoutes[route.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </Box>
                                {route.eta && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        ETA: {route.eta}
                                    </Typography>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Type: {route.busType || 'Town Bus'}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Stops: {route.stops ? route.stops.join(', ') : 'Direct'}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Stack spacing={1} sx={{ mt: 2 }}>
                                    {route.timings && route.timings.length > 0 ? (
                                        route.timings.map((timing) => (
                                            <Typography key={timing} variant="h5" color="primary">
                                                {timing}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            {t('noTimingsAvailable')}
                                        </Typography>
                                    )}
                                </Stack>
                            </CardContent>
                        </LiquidCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
