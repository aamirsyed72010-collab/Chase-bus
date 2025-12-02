"use client";

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import { ADMIN_EMAIL } from '@/config/constants';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackDialog({ open, onClose }: FeedbackDialogProps) {
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '24px',
          backdropFilter: 'blur(16px)',
          bgcolor: 'rgba(255, 255, 255, 0.8)', // Fallback/Light mode
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          '.MuiPaletteMode-dark &': {
             bgcolor: 'rgba(18, 18, 18, 0.8)',
          }
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">{t('submitFeedback')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('feedbackDescription', { defaultValue: 'We value your feedback! Let us know how we can improve.' })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label={t('subject', { defaultValue: 'Subject' })}
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': { borderRadius: '12px' } 
            }}
          />
          <TextField
            label={t('message', { defaultValue: 'Message' })}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': { borderRadius: '12px' } 
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: '12px' }}>
          {t('cancel')}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSend} 
          endIcon={<SendIcon />}
          disabled={!subject || !message}
          sx={{ borderRadius: '12px', px: 3 }}
        >
          {t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
