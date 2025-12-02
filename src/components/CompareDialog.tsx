import { Dialog, DialogTitle, DialogContent, Typography, Box, Divider, IconButton, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { Route } from '@/data/routes';
import { useTranslation } from 'react-i18next';

interface CompareDialogProps {
  open: boolean;
  onClose: () => void;
  selectedRoutes: Route[];
}

export default function CompareDialog({ open, onClose, selectedRoutes }: CompareDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '24px' } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">{t('compareRoutes')}</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        {selectedRoutes.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">{t('selectRoutesToCompare')}</Typography>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {selectedRoutes.map((route) => (
              <Grid size={{ xs: 12, sm: 6, md: 12 / Math.min(selectedRoutes.length, 3) }} key={route.id}>
                <Box sx={{ 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: '16px',
                  height: '100%',
                  bgcolor: 'background.paper'
                }}>
                  <Typography variant="h6" color="primary" gutterBottom>{route.routeName}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {route.from} → {route.to}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">ETA</Typography>
                      <Typography variant="body1" fontWeight="medium">{route.eta || 'N/A'}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Type</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip label={route.busType || 'Town Bus'} size="small" color="secondary" variant="outlined" />
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Stops</Typography>
                      <Typography variant="body2">{route.stops?.length || 0} stops</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Next Bus</Typography>
                      <Typography variant="body1" color="success.main">
                        {route.timings?.[0] || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
