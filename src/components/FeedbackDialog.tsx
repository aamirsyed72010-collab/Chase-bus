"use client";

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackDialog({ open, onClose }: FeedbackDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('submitFeedback')}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please send your feedback directly to our admin via email.
        </Typography>
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          <Link href="mailto:aamir.p@gmail.com">aamir.p@gmail.com</Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close')}</Button>
        <Button variant="contained" color="primary" href="mailto:aamir.p@gmail.com">
          Send Email
        </Button>
      </DialogActions>
    </Dialog>
  );
}
