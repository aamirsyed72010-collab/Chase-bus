"use client";

import { Box, Container, Typography, Link } from '@mui/material';
// import { useTranslation } from 'react-i18next';

export default function Footer() {
  // const { t } = useTranslation(); // t is currently unused

  return (
    <Box component="footer" sx={{ 
      py: 3, 
      px: 2, 
      mt: 'auto', 
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Bus Tracker App
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://your-website.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          <Link href="mailto:aamir.p@gmail.com" color="inherit">
            Contact Admin: aamir.p@gmail.com
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
