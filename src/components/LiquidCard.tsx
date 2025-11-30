"use client";

import { Box, BoxProps, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface LiquidCardProps extends BoxProps {
  delay?: number;
}

export default function LiquidCard({ children, delay = 0, sx, ...props }: LiquidCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -5,
        boxShadow: isDark 
          ? '0 12px 40px 0 rgba(0, 0, 0, 0.5)' 
          : '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
      }}
      sx={{
        background: isDark 
          ? "rgba(30, 30, 30, 0.4)" 
          : "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: isDark 
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' 
          : '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
