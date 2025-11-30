"use client";

import { Box, BoxProps, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface LiquidCardProps extends BoxProps {
  delay?: number;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function LiquidCard({ 
  children, 
  delay = 0, 
  elevation = 1,
  sx, 
  ...props 
}: LiquidCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Material You elevation system
  const elevationStyles = {
    0: { blur: 0, shadow: 'none', tint: 0 },
    1: { blur: 20, shadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)', tint: 0.05 },
    2: { blur: 24, shadow: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)', tint: 0.08 },
    3: { blur: 28, shadow: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)', tint: 0.11 },
    4: { blur: 32, shadow: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)', tint: 0.12 },
    5: { blur: 36, shadow: '0 20px 40px rgba(0,0,0,0.2)', tint: 0.14 },
  };

  const currentElevation = elevationStyles[elevation];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      }}
      sx={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: currentElevation.shadow,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        // Liquid glass base layer
        background: isDark 
          ? `linear-gradient(135deg, 
              rgba(${parseInt(theme.palette.primary.main.slice(1,3), 16)}, ${parseInt(theme.palette.primary.main.slice(3,5), 16)}, ${parseInt(theme.palette.primary.main.slice(5,7), 16)}, ${currentElevation.tint}) 0%,
              rgba(30, 30, 30, 0.4) 100%
            )`
          : `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.7) 0%,
              rgba(255, 255, 255, 0.4) 100%
            )`,
        
        backdropFilter: `blur(${currentElevation.blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${currentElevation.blur}px) saturate(180%)`,
        
        // Gradient border for premium feel
        border: '1px solid',
        borderColor: isDark 
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.5)',
        
        // Noise texture overlay for glass effect
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.03 : 0.02,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        },
        
        // Shimmer effect on hover
        '&:hover': {
          borderColor: isDark 
            ? 'rgba(255, 255, 255, 0.18)'
            : 'rgba(255, 255, 255, 0.7)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(31, 38, 135, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          
          '&::after': {
            opacity: 1,
          },
        },
        
        // Subtle shimmer overlay
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        },
        
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
