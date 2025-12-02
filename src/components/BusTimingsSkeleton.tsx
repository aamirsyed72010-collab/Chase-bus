import { Skeleton, CardContent, Box, Stack, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import LiquidCard from './LiquidCard';

export default function BusTimingsSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Skeleton variant="text" width={300} height={60} sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
            <LiquidCard elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Skeleton variant="text" width="70%" height={32} />
                  <Skeleton variant="circular" width={30} height={30} />
                </Box>
                <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
                
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Skeleton variant="text" width="30%" height={40} />
                  <Skeleton variant="text" width="30%" height={40} />
                </Stack>
              </CardContent>
            </LiquidCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
