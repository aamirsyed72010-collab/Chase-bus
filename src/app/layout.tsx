"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { AuthProvider } from "@/context/AuthContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import Script from "next/script"; // Import Script from next/script
import LiquidBackground from "@/components/LiquidBackground";

const inter = Inter({
  variable: "--font-inter",
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
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeContextProvider>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <LiquidBackground>
                {children}
              </LiquidBackground>
            </AuthProvider>
          </I18nextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
