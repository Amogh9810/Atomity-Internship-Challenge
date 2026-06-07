'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/tokens/tokens';

interface SmallReactorProps {
  id: string;
  name: string;
  provider: string;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, reactorId: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function SmallReactor({
  id,
  name,
  provider,
  isDragging,
  onDragStart,
  onDragEnd,
}: SmallReactorProps) {
  const [isHovered, setIsHovered] = useState(false);

  const providerColors: Record<string, { primary: string; secondary: string; glow: string; rgb: string }> = {
    AWS: {
      primary: '#FF9900',
      secondary: '#FFB84D',
      glow: 'rgba(255, 153, 0, 0.6)',
      rgb: '255, 153, 0',
    },
    Azure: {
      primary: '#0078D4',
      secondary: '#50E6FF',
      glow: 'rgba(0, 168, 226, 0.6)',
      rgb: '0, 168, 226',
    },
    GCP: {
      primary: '#EA4335',
      secondary: '#FF6D5B',
      glow: 'rgba(234, 51, 53, 0.6)',
      rgb: '234, 51, 53',
    },
    'On-Prem': {
      primary: '#4CAF50',
      secondary: '#81C784',
      glow: 'rgba(76, 175, 80, 0.6)',
      rgb: '76, 175, 80',
    },
  };

  const colors = providerColors[provider] || providerColors.AWS;

  return (
    <motion.div
      draggable
      onDragStart={(e) => onDragStart(e as React.DragEvent<HTMLDivElement>, id)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        y: isDragging ? 0 : isHovered ? -2 : [0, -2, 0],
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="relative w-32 h-32 cursor-grab active:cursor-grabbing select-none flex flex-col items-center justify-center"
    >
      {/* Premium Cloud SVG with Glassmorphism */}
      <svg
        viewBox="0 0 200 160"
        className="absolute inset-0 w-full h-full"
        style={{
          filter: isHovered
            ? `drop-shadow(0 0 40px ${colors.glow}) drop-shadow(0 0 20px ${colors.primary})`
            : `drop-shadow(0 0 25px ${colors.glow})`,
        }}
      >
        <defs>
          {/* Multiple glow filters */}
          <filter id={`innerGlow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`outerGlow-${id}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for cloud fill */}
          <linearGradient id={`cloudGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.25" />
            <stop offset="50%" stopColor={colors.primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.08" />
          </linearGradient>

          {/* Radial gradient for inner luminous core */}
          <radialGradient id={`coreGradient-${id}`} cx="45%" cy="45%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
            <stop offset="60%" stopColor={colors.secondary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Outer ambient glow layer */}
        <motion.circle
          cx="100"
          cy="80"
          r="75"
          fill="none"
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity="0.2"
          animate={{ r: [70, 80] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Geometric cloud silhouette - clean and premium */}
        <path
          d="M 65 110 C 50 110, 38 100, 38 85 C 38 70, 48 60, 60 60 C 62 42, 75 32, 90 32 C 110 32, 125 44, 128 60 C 145 62, 158 74, 158 88 C 158 105, 145 118, 128 118 L 72 118 C 62 118, 65 110, 65 110 Z"
          fill={`url(#cloudGradient-${id})`}
          stroke={colors.primary}
          strokeWidth="1.2"
          opacity="0.9"
          filter={`url(#innerGlow-${id})`}
        />

        {/* Secondary outline for glassmorphism effect */}
        <path
          d="M 65 110 C 50 110, 38 100, 38 85 C 38 70, 48 60, 60 60 C 62 42, 75 32, 90 32 C 110 32, 125 44, 128 60 C 145 62, 158 74, 158 88 C 158 105, 145 118, 128 118 L 72 118 C 62 118, 65 110, 65 110 Z"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Luminous energy core inside cloud */}
        <motion.circle
          cx="100"
          cy="75"
          r="20"
          fill={`url(#coreGradient-${id})`}
          filter={`url(#outerGlow-${id})`}
          animate={{
            r: [18, 24],
            opacity: [0.8, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner bright core pulse */}
        <motion.circle
          cx="100"
          cy="75"
          r="8"
          fill={colors.primary}
          opacity="0.9"
          animate={{
            r: [6, 12],
            opacity: [1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting particles - energy particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2"
            fill={colors.primary}
            opacity="0.7"
            animate={{
              cx: [100 + 35 * Math.cos((2 * Math.PI * i) / 3), 100 + 35 * Math.cos((2 * Math.PI * i) / 3 + 2 * Math.PI)],
              cy: [75 + 35 * Math.sin((2 * Math.PI * i) / 3), 75 + 35 * Math.sin((2 * Math.PI * i) / 3 + 2 * Math.PI)],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Connecting energy lines to particles */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={`line-${i}`}
            x1="100"
            y1="75"
            x2={100 + 35 * Math.cos((2 * Math.PI * i) / 3)}
            y2={75 + 35 * Math.sin((2 * Math.PI * i) / 3)}
            stroke={colors.primary}
            strokeWidth="0.5"
            opacity="0.3"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      {/* Label below cloud */}
      <motion.div
        animate={{ scale: isHovered ? 1.15 : 1, y: isHovered ? 8 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-full mt-3 text-sm font-bold text-center"
        style={{ color: colors.primary }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
}
