"use client";

import { Typography, Container, Box, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Route } from "@/data/routes";
import { ADMIN_EMAIL } from "@/config/constants";

import AdminAnalytics from "@/components/AdminAnalytics";

export default function Admin() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({ routeName: '', from: '', to: '', timings: '', stops: '', busType: 'Town Bus' });
  const [routes, setRoutes] = useState<Route[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchBusTimings = async () => {
      try {
        const response = await fetch('/api/bus-timings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoutes(data.routes);
      } catch (error) {
        console.error("Failed to fetch bus timings:", error);
        setSnackbarMessage(t('failedToFetchBusTimings'));
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/");
    }
    if (user && user.email === ADMIN_EMAIL) {
      fetchBusTimings();
    }
  }, [user, loading, router, t]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoute({ routeName: '', from: '', to: '', timings: '', stops: '', busType: 'Town Bus' }); // Reset form
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoute((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoute = async () => {
    try {
      const timingsArray = newRoute.timings.split(',').map(t => t.trim()).filter(t => t !== '');
      const stopsArray = newRoute.stops.split(',').map(s => s.trim()).filter(s => s !== '');
      const updatedRoutes = [...routes, { ...newRoute, timings: timingsArray, stops: stopsArray }];

      const response = await fetch('/api/bus-timings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routes: updatedRoutes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRoutes(result.data.routes);
      setSnackbarMessage(t('routeAddedSuccessfully'));
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error("Failed to add route:", error);
      setSnackbarMessage(t('failedToAddRoute'));
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading || !user || user.email !== ADMIN_EMAIL) {
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
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('adminSettings')}
        </Typography>
        
        {/* Analytics Section */}
        <AdminAnalytics routes={routes} />

        <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2 }}>
          {t('addNewRoute')}
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="bus routes table">
            <TableHead>
              <TableRow>
                <TableCell>{t('routeName')}</TableCell>
                <TableCell>{t('from')}</TableCell>
                <TableCell>{t('to')}</TableCell>
                <TableCell>{t('timings')}</TableCell>
                <TableCell>Stops</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.routeName}>
                  <TableCell>{route.routeName}</TableCell>
                  <TableCell>{route.from}</TableCell>
                  <TableCell>{route.to}</TableCell>
                  <TableCell>{route.timings.join(', ')}</TableCell>
                  <TableCell>{route.stops ? route.stops.join(', ') : '-'}</TableCell>
                  <TableCell>{route.busType || '-'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ mr: 1 }}>{t('edit')}</Button>
                    <Button variant="outlined" color="error" size="small">{t('delete')}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('addBusRoute')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="routeName"
              label={t('routeName')}
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.routeName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="from"
              label={t('from')}
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.from}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="to"
              label={t('to')}
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.to}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="timings"
              label={t('timingsCommaSeparated')}
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.timings}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="stops"
              label="Stops (Comma Separated)"
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.stops}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="busType"
              label="Bus Type (Town Bus, Express, Deluxe)"
              type="text"
              fullWidth
              variant="standard"
              value={newRoute.busType}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button onClick={handleAddRoute}>{t('addRoute')}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
