"use client";

import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidBackgroundProps {
  children: ReactNode;
}

export default function LiquidBackground({ children }: LiquidBackgroundProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.default",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Animated Blobs */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Blob
          color={isDark ? "#381E72" : "#D0BCFF"}
          top="-10%"
          left="-10%"
          size="600px"
          delay={0}
        />
        <Blob
          color={isDark ? "#492532" : "#EFB8C8"}
          top="40%"
          right="-10%"
          size="500px"
          delay={2}
        />
        <Blob
          color={isDark ? "#332D41" : "#CCC2DC"}
          bottom="-10%"
          left="20%"
          size="600px"
          delay={4}
        />
      </Box>

      {/* Glass Overlay for depth */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(60px)", // Heavy blur to blend the blobs
          minHeight: "100vh",
          backgroundColor: isDark
            ? "rgba(20, 18, 24, 0.7)"
            : "rgba(255, 251, 254, 0.7)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Blob({
  color,
  top,
  left,
  right,
  bottom,
  size,
  delay,
}: {
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  delay: number;
}) {
  return (
    <Box
      component={motion.div}
      animate={{
        y: [0, 50, 0],
        x: [0, 30, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      sx={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(80px)",
        opacity: 0.6,
      }}
    />
  );
}
