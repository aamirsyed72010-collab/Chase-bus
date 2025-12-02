"use client";

import { Box, Container, Typography, Paper, TextField, Button, Switch, FormControlLabel, Divider, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuth } from '@/context/AuthContext';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import LiquidBackground from '@/components/LiquidBackground';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SaveIcon from '@mui/icons-material/Save';

export default function ProfilePage() {
  const { user } = useAuth();
  const { preferences, setHomeLocation, setWorkLocation, toggleNotifications } = useUserPreferences();
  
  const [homeAddress, setHomeAddress] = useState(preferences.homeLocation?.address || '');
  const [workAddress, setWorkAddress] = useState(preferences.workLocation?.address || '');

  const handleSaveHome = () => {
    // Mock geocoding - in real app would convert address to coords
    setHomeLocation({ lat: 0, lng: 0, address: homeAddress });
  };

  const handleSaveWork = () => {
    setWorkLocation({ lat: 0, lng: 0, address: workAddress });
  };

  if (!user) return <Typography>Please login to view profile</Typography>;

  return (
    <LiquidBackground>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            borderRadius: '24px',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <Avatar 
              src={user.photoURL || undefined} 
              sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}
            >
              {user.displayName?.[0] || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">{user.displayName}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 1 }} /> Saved Locations
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Home Address"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  sx={{ mb: 1 }}
                  variant="outlined"
                />
                <Button 
                  startIcon={<SaveIcon />} 
                  onClick={handleSaveHome}
                  disabled={homeAddress === preferences.homeLocation?.address}
                >
                  Save Home
                </Button>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Work Address"
                  value={workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                  sx={{ mb: 1 }}
                  variant="outlined"
                />
                <Button 
                  startIcon={<WorkIcon />} 
                  onClick={handleSaveWork}
                  disabled={workAddress === preferences.workLocation?.address}
                >
                  Save Work
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>Preferences</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={preferences.notificationsEnabled}
                    onChange={toggleNotifications}
                  />
                }
                label="Enable Push Notifications"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Saved Routes: {preferences.favorites.length}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LiquidBackground>
  );
}
