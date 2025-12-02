"use client";

import { CardContent, Typography, Box, Stack, Divider, IconButton, Checkbox, Fab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { Route } from '@/data/routes';
import { shareRoute } from '@/utils/share';
import LiquidCard from './LiquidCard';
import BusTimingsSkeleton from './BusTimingsSkeleton';
import CompareDialog from './CompareDialog';

interface BusTimingsProps {
    searchQuery: string;
    allRoutes?: Route[];
    selectedBusTypes?: string[];
    sortBy?: 'eta' | 'name' | 'distance';
    userLocation?: [number, number] | null;
}

export default function BusTimings({ 
    searchQuery, 
    allRoutes, 
    selectedBusTypes = ['All'], 
    sortBy = 'name',
    userLocation 
}: BusTimingsProps) {
    const { t } = useTranslation();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [favoriteRoutes, setFavoriteRoutes] = useState<Record<string, boolean>>({});
    const [selectedRoutes, setSelectedRoutes] = useState<Route[]>([]);
    const [compareDialogOpen, setCompareDialogOpen] = useState(false);

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

    const getDistance = (route: Route) => {
        if (!userLocation || !route.path || route.path.length === 0) return Infinity;
        // Simple distance to first point of route
        const [lat1, lon1] = userLocation;
        const [lat2, lon2] = route.path[0];
        return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
    };

    const filteredRoutes = routes
        .filter(route => {
            const matchesSearch = 
                route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                route.to.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesType = selectedBusTypes.includes('All') || 
                (route.busType && selectedBusTypes.includes(route.busType));

            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.routeName.localeCompare(b.routeName);
            }
            if (sortBy === 'eta') {
                // Extract number from ETA string (e.g., "10 min")
                const etaA = parseInt(a.eta || '999');
                const etaB = parseInt(b.eta || '999');
                return etaA - etaB;
            }
            if (sortBy === 'distance') {
                return getDistance(a) - getDistance(b);
            }
            return 0;
        });

    if (loading) {
        return <BusTimingsSkeleton />;
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
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox 
                                            checked={selectedRoutes.some(r => r.id === route.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    if (selectedRoutes.length < 3) {
                                                        setSelectedRoutes([...selectedRoutes, route]);
                                                    } else {
                                                        // Optional: Show toast that max 3 routes can be compared
                                                        alert(t('maxCompareLimit'));
                                                    }
                                                } else {
                                                    setSelectedRoutes(selectedRoutes.filter(r => r.id !== route.id));
                                                }
                                            }}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                        <IconButton onClick={() => shareRoute(route)} size="small" color="primary" sx={{ mr: 1 }}>
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton onClick={() => toggleFavorite(route.id)} size="small" color="primary">
                                            {favoriteRoutes[route.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Box>
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
            
            {/* Compare FAB */}
            {selectedRoutes.length > 0 && (
                <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
                    <Fab 
                        variant="extended" 
                        color="primary" 
                        onClick={() => setCompareDialogOpen(true)}
                        sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <CompareArrowsIcon sx={{ mr: 1 }} />
                        {t('compare')} ({selectedRoutes.length})
                    </Fab>
                </Box>
            )}

            <CompareDialog 
                open={compareDialogOpen} 
                onClose={() => setCompareDialogOpen(false)} 
                selectedRoutes={selectedRoutes} 
            />
        </Box>
    );
}
