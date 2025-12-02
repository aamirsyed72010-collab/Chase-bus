"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { AuthProvider } from "@/context/AuthContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import Script from "next/script"; // Import Script from next/script
import LiquidBackground from "@/components/LiquidBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_PUBLISHER_ID" // Replace with your actual publisher ID
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90caf9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeContextProvider>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <UserPreferencesProvider>
                <LiquidBackground>
                  {children}
                </LiquidBackground>
              </UserPreferencesProvider>
            </AuthProvider>
          </I18nextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
