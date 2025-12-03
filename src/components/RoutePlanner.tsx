"use client";

import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, StepContent, Autocomplete, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '@/i18n/config'; // Ensure i18n is initialized
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { busRoutes } from '@/data/routes';
import { findAlternativeRoutes, RouteOption } from '@/utils/routeAlgorithms';
import RouteComparison from './RouteComparison';

export default function RoutePlanner() {
  const { t } = useTranslation();
  const [stops, setStops] = useState<string[]>(['', '']);
  const [activeStep, setActiveStep] = useState(0);
  const [alternativeRoutes, setAlternativeRoutes] = useState<RouteOption[]>([]);

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
    // For now, support only direct origin-destination (first and last stop)
    const origin = stops[0];
    const destination = stops[stops.length - 1];
    
    if (!origin || !destination) return;
    
    const routes = findAlternativeRoutes(busRoutes, origin, destination);
    setAlternativeRoutes(routes);
    setActiveStep(1);
  };

  const handleSelectRoute = (route: RouteOption) => {
    console.log('Selected route:', route);
    // Future: Add to favorites, show on map, etc.
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
            <RouteComparison routes={alternativeRoutes} onSelectRoute={handleSelectRoute} />
            <Button onClick={() => setActiveStep(0)} sx={{ mt: 2 }}>
              {t('modify')}
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  );
}
