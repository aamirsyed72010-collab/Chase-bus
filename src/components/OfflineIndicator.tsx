"use client";

import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    function handleStatusChange() {
      setIsOffline(!navigator.onLine);
    }

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Check initial status
    handleStatusChange();

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <Snackbar
      open={isOffline}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert 
        icon={<WifiOffIcon fontSize="inherit" />} 
        severity="warning" 
        variant="filled"
        sx={{ 
          width: '100%', 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}
      >
        You are currently offline. Using cached data.
      </Alert>
    </Snackbar>
  );
}
