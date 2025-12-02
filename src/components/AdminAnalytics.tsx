"use client";

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Route } from '@/data/routes';

interface AdminAnalyticsProps {
  routes: Route[];
}

export default function AdminAnalytics({ routes }: AdminAnalyticsProps) {
  const theme = useTheme();

  // 1. Data for Pie Chart (Routes by Type)
  const routeTypeData = React.useMemo(() => {
    const typeCount: { [key: string]: number } = {};
    routes.forEach(route => {
      const type = route.busType || 'Other';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    return Object.keys(typeCount).map(type => ({ name: type, value: typeCount[type] }));
  }, [routes]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // 2. Data for Bar Chart (Stops per Route)
  const stopsData = React.useMemo(() => {
    return routes.map(route => ({
      name: route.routeName.split(':')[0], // Shorten name
      stops: route.stops?.length || 0,
    }));
  }, [routes]);

  // 3. Mock Data for Line Chart (Passenger Trends)
  const passengerData = [
    { name: 'Mon', passengers: 1200 },
    { name: 'Tue', passengers: 1350 },
    { name: 'Wed', passengers: 1100 },
    { name: 'Thu', passengers: 1400 },
    { name: 'Fri', passengers: 1800 },
    { name: 'Sat', passengers: 1600 },
    { name: 'Sun', passengers: 900 },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', minHeight: 350 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Route Distribution</Typography>
              <Box sx={{ height: 250, width: '100%' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={routeTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {routeTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 12,
                        border: `1px solid ${theme.palette.divider}`
                      }} 
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', minHeight: 350 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Route Complexity (Stops)</Typography>
              <Box sx={{ height: 250, width: '100%' }}>
                <ResponsiveContainer>
                  <BarChart data={stopsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 12,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    />
                    <Bar dataKey="stops" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', minHeight: 350 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Weekly Passengers (Est.)</Typography>
              <Box sx={{ height: 250, width: '100%' }}>
                <ResponsiveContainer>
                  <LineChart data={passengerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 12,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="passengers" 
                      stroke={theme.palette.secondary.main} 
                      strokeWidth={3}
                      dot={{r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
