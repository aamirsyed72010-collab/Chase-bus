import { useState } from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import FeedbackDialog from './FeedbackDialog';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

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
          <Link color="inherit" href="/">
            Bus Tracker
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          <Link 
            component="button" 
            variant="body2" 
            color="inherit" 
            onClick={() => setFeedbackOpen(true)}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {t('submitFeedback', { defaultValue: 'Submit Feedback' })}
          </Link>
        </Typography>
      </Container>
      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </Box>
  );
}
