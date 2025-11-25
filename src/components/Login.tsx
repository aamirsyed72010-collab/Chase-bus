"use client";

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Button, Container, Paper, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          {t('busTracker')}
        </Typography>
        <Typography component="p" sx={{ mt: 1 }}>
          {t('signInToContinue')}
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoogleSignIn}
          startIcon={<GoogleIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          {t('signInWithGoogle')}
        </Button>
      </Paper>
    </Container>
  );
}
