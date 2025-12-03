"use client";

import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';


export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4,
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <section>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to Bus Tracker. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              2. Data We Collect
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </Typography>
            <ul style={{ paddingLeft: '20px', color: 'var(--mui-palette-text-secondary)' }}>
              <li><strong>Location Data:</strong> We use your location to show nearby bus stops and routes. This data is processed locally on your device.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products and services.</li>
              <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
            </ul>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              3. Cookies
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. We use local storage to save your preferences such as theme (dark/light mode) and favorite routes.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              4. Third-Party Links
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              5. Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you have any questions about this privacy policy or our privacy practices, please contact us at: admin@bustracker.com
            </Typography>
          </section>
        </Box>
      </Paper>
    </Container>
  );
}
