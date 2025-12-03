"use client";

import { Box, Card, CardContent, Typography, Chip, Stack, Divider, Button } from '@mui/material';
import { RouteOption } from '@/utils/routeAlgorithms';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PeopleIcon from '@mui/icons-material/People';
import RecommendIcon from '@mui/icons-material/Recommend';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

interface RouteComparisonProps {
  routes: RouteOption[];
  onSelectRoute?: (route: RouteOption) => void;
}

export default function RouteComparison({ routes, onSelectRoute }: RouteComparisonProps) {
  if (routes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No routes found</Typography>
      </Box>
    );
  }

  const getCrowdingColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getRouteLabel = (type: string) => {
    switch (type) {
      case 'fastest': return 'Fastest Route';
      case 'cheapest': return 'Cheapest Route';
      case 'least-transfers': return 'Fewest Transfers';
      default: return 'Route';
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Route Options ({routes.length})
      </Typography>
      
      <Stack spacing={3}>
        {routes.map((route) => (
          <Card 
            key={route.id}
            elevation={route.recommended ? 4 : 1}
            sx={{ 
              position: 'relative',
              borderRadius: '20px',
              border: route.recommended ? '2px solid' : 'none',
              borderColor: 'primary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            {route.recommended && (
              <Chip 
                icon={<RecommendIcon />}
                label="Recommended"
                color="primary"
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontWeight: 600
                }}
              />
            )}
            
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, pr: 10 }}>
                {getRouteLabel(route.routeType)}
              </Typography>
              
              {/* Key Metrics */}
              <Stack direction="row" spacing={3} sx={{ mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    {route.totalDuration} min
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    ₹{route.totalCost}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SwapHorizIcon color="action" fontSize="small" />
                  <Typography variant="body2">
                    {route.transfers} {route.transfers === 1 ? 'transfer' : 'transfers'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon color="action" fontSize="small" />
                  <Chip 
                    label={`${route.crowdingLevel} crowding`}
                    color={getCrowdingColor(route.crowdingLevel)}
                    size="small"
                  />
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Route Segments */}
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Journey Details:
              </Typography>
              
              <Stack spacing={1.5}>
                {route.segments.map((segment, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 1.5,
                      bgcolor: 'rgba(0,0,0,0.03)',
                      borderRadius: '12px'
                    }}
                  >
                    <DirectionsBusIcon color="primary" />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {segment.from} → {segment.to}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {segment.routeName} • {segment.busType} • ~{Math.round(segment.duration)} min
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      ₹{segment.cost}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {onSelectRoute && (
                <Button
                  variant={route.recommended ? "contained" : "outlined"}
                  fullWidth
                  sx={{ mt: 3, borderRadius: '12px', py: 1.5 }}
                  onClick={() => onSelectRoute(route)}
                >
                  Select This Route
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
