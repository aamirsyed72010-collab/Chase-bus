"use client";

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function FeedbackDialog({ open, onClose }) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // In a real application, you would send this feedback to a backend API
    console.log("User Feedback:", feedback);
    setSnackbarMessage(t('feedbackSubmittedSuccessfully'));
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setFeedback(''); // Clear feedback
    onClose(); // Close the dialog
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{t('submitFeedback')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('yourFeedback')}
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('cancel')}</Button>
          <Button onClick={handleSubmitFeedback} variant="contained" color="primary">
            {t('submit')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
