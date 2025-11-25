"use client";

import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

export default function LogoutButton() {
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
    >
      {t('logout')}
    </Button>
  );
}
