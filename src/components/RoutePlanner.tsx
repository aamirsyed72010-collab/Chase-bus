"use client";

import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, StepContent, Autocomplete, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/i18n/config'; // Ensure i18n is initialized
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { busRoutes } from '@/data/routes';

export default function RoutePlanner() {
  const { t } = useTranslation();
  const [stops, setStops] = useState<string[]>(['', '']);
  const [activeStep, setActiveStep] = useState(0);
  interface RouteSegment {
    from: string;
    to: string;
    bus: string;
    duration: string;
  }

  interface RoutePlan {
    totalDuration: string;
    totalDistance: string;
    segments: RouteSegment[];
  }

  const [plannedRoute, setPlannedRoute] = useState<RoutePlan | null>(null);

  const allStops = Array.from(new Set(busRoutes.flatMap(r => [r.from, r.to, ...(r.stops || [])])));

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleRemoveStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handleStopChange = (index: number, value: string | null) => {
    const newStops = [...stops];
    newStops[index] = value || '';
    setStops(newStops);
  };

  const handlePlanRoute = () => {
    // Mock route planning logic
    // In a real app, this would use a graph algorithm (Dijkstra/A*) to find the best path
    const mockPlan: RoutePlan = {
      totalDuration: '45 min',
      totalDistance: '12 km',
      segments: stops.slice(0, -1).map((stop, i) => ({
        from: stop,
        to: stops[i + 1],
        bus: 'Bus ' + (Math.floor(Math.random() * 100) + 1),
        duration: '15 min'
      }))
    };
    setPlannedRoute(mockPlan);
    setActiveStep(1);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: '24px', bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <DirectionsBusIcon sx={{ mr: 1 }} /> {t('planJourney')}
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>{t('selectStops')}</StepLabel>
          <StepContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {stops.map((stop, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <Autocomplete
                    fullWidth
                    options={allStops}
                    value={stop}
                    onChange={(_, newValue) => handleStopChange(index, newValue)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label={index === 0 ? t('origin') : index === stops.length - 1 ? t('destination') : `${t('stop')} ${index}`} 
                        size="small"
                      />
                    )}
                  />
                  {stops.length > 2 && (
                    <IconButton onClick={() => handleRemoveStop(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddStop} size="small">
                {t('addStop')}
              </Button>
              <Button variant="contained" onClick={handlePlanRoute} disabled={stops.some(s => !s)}>
                {t('findRoute')}
              </Button>
            </Box>
          </StepContent>
        </Step>
        
        <Step>
          <StepLabel>{t('routeDetails')}</StepLabel>
          <StepContent>
            {plannedRoute && (
              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Total: {plannedRoute.totalDuration} ({plannedRoute.totalDistance})
                </Typography>
                {plannedRoute.segments.map((segment, i) => (
                  <Paper key={i} variant="outlined" sx={{ p: 2, mb: 1, bgcolor: 'rgba(0,0,0,0.02)' }}>
                    <Typography variant="body2" fontWeight="bold">
                      {segment.from} → {segment.to}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Take {segment.bus} • {segment.duration}
                    </Typography>
                  </Paper>
                ))}
                <Button onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>
                  {t('modify')}
                </Button>
              </Box>
            )}
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  );
}
