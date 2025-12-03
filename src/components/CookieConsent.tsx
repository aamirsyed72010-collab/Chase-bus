"use client";

import React, { useState, useEffect } from 'react';
import { Snackbar, Button, Typography, Box } from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setOpen(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ 
        bottom: { xs: 16, sm: 24 },
        maxWidth: '600px',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          color: 'text.primary',
          p: 2,
          borderRadius: 2,
          boxShadow: 6,
          border: '1px solid',
          borderColor: 'divider',
          width: '100%'
        }}
      >
        <CookieIcon color="primary" />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAccept}
          size="small"
        >
          Accept
        </Button>
      </Box>
    </Snackbar>
  );
}
