'use client';

import { motion } from 'framer-motion';

interface CloudCoreProps {
  isActive: boolean;
  powerLevel: number;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragOver?: boolean;
  selectedProviderId?: string | null;
}

export function CloudCore({ isActive, powerLevel, onDragOver, onDrop, isDragOver, selectedProviderId }: CloudCoreProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    onDragOver?.(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop?.(e);
  };

  // Provider color mapping
  const providerColors: Record<string, { primary: string; secondary: string; glow: string }> = {
    aws: { primary: '#FF9900', secondary: '#FF6B35', glow: 'rgba(255, 153, 0, 0.7)' },
    azure: { primary: '#0078D4', secondary: '#00B7EB', glow: 'rgba(0, 184, 235, 0.7)' },
    gcp: { primary: '#EA4335', secondary: '#E8765E', glow: 'rgba(234, 67, 53, 0.7)' },
    onprem: { primary: '#4CAF50', secondary: '#66BB6A', glow: 'rgba(76, 175, 80, 0.7)' },
  };

  // Default to gold if no provider selected
  const defaultPrimary = '#FFD700';
  const defaultSecondary = '#FF8C00';
  const defaultGlow = 'rgba(255, 215, 0, 0.7)';

  // Get colors based on selected provider
  const colors = selectedProviderId
    ? providerColors[selectedProviderId.toLowerCase()] || { primary: defaultPrimary, secondary: defaultSecondary, glow: defaultGlow }
    : { primary: defaultPrimary, secondary: defaultSecondary, glow: defaultGlow };

  const corePrimary = colors.primary;
  const coreSecondary = colors.secondary;
  const coreGlow = colors.glow;

  return (
    <motion.div
      className="relative w-64 h-56 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 10,
        delay: 0.4,
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Premium Cloud Core SVG */}
      <motion.svg
        viewBox="0 0 300 240"
        className="absolute inset-0 w-full h-full"
        style={{
          filter: isDragOver
            ? `drop-shadow(0 0 60px rgba(0, 217, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 217, 255, 0.5))`
            : `drop-shadow(0 0 40px ${coreGlow}) drop-shadow(0 0 20px ${coreSecondary}33)`,
        }}
        animate={{
          filter: isDragOver
            ? `drop-shadow(0 0 60px rgba(0, 217, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 217, 255, 0.5))`
            : `drop-shadow(0 0 40px ${coreGlow}) drop-shadow(0 0 20px ${coreSecondary}33)`,
        }}
        transition={{ duration: 0.6 }}
      >
        <defs>
          {/* Multiple glow filters for premium effect */}
          <filter id="innerGlowCore" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="outerGlowCore" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for cloud fill with glassmorphism */}
          <linearGradient id="coreCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity={isDragOver ? 0.35 : 0.25} />
            <stop offset="50%" stopColor={corePrimary} stopOpacity={isDragOver ? 0.25 : 0.15} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={isDragOver ? 0.15 : 0.08} />
          </linearGradient>

          {/* Radial gradient for luminous core */}
          <radialGradient id="coreEnergy" cx="45%" cy="45%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity="1" />
            <stop offset="60%" stopColor={coreSecondary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={corePrimary} stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Outer ambient breathing glow */}
        <motion.circle
          cx="150"
          cy="120"
          r="110"
          fill="none"
          stroke={corePrimary}
          strokeWidth="0.8"
          opacity={isDragOver ? 0.5 : 0.25}
          animate={{
            r: isDragOver ? [100, 120] : [105, 115],
            opacity: isDragOver ? [0.5, 0.7] : [0.25, 0.35],
          }}
          transition={{
            duration: isDragOver ? 1.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main cloud silhouette - geometric and clean */}
        <motion.path
          d="M 100 160 C 70 160, 45 138, 45 110 C 45 85, 62 68, 82 68 C 85 40, 105 20, 130 20 C 160 20, 185 40, 190 68 C 220 71, 245 98, 245 130 C 245 160, 220 185, 190 185 L 110 185 C 85 185, 100 160, 100 160 Z"
          fill="url(#coreCloudGradient)"
          stroke={corePrimary}
          strokeWidth="1.5"
          opacity="0.95"
          filter="url(#innerGlowCore)"
          animate={{
            opacity: isDragOver ? 1 : powerLevel > 0 ? 0.95 : 0.85,
          }}
        />

        {/* Secondary outline for glassmorphism depth */}
        <path
          d="M 100 160 C 70 160, 45 138, 45 110 C 45 85, 62 68, 82 68 C 85 40, 105 20, 130 20 C 160 20, 185 40, 190 68 C 220 71, 245 98, 245 130 C 245 160, 220 185, 190 185 L 110 185 C 85 185, 100 160, 100 160 Z"
          fill="none"
          stroke={coreSecondary}
          strokeWidth="0.8"
          opacity="0.35"
        />

        {/* Main luminous energy core - pulsing heart */}
        <motion.circle
          cx="150"
          cy="115"
          r="32"
          fill="url(#coreEnergy)"
          filter="url(#outerGlowCore)"
          animate={{
            r: isDragOver ? [28, 38] : [30, 36],
            opacity: [0.9, 1],
          }}
          transition={{
            duration: isDragOver ? 1.2 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner bright core */}
        <motion.circle
          cx="150"
          cy="115"
          r="16"
          fill={corePrimary}
          opacity="0.95"
          animate={{
            r: isDragOver ? [12, 20] : [14, 18],
            opacity: [1, 0.8],
          }}
          transition={{
            duration: isDragOver ? 1 : 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Core highlight for 3D effect */}
        <circle cx="140" cy="105" r="6" fill={corePrimary} opacity="0.6" filter="url(#innerGlowCore)" />

        {/* Orbiting energy particles - larger scale */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            r="3.5"
            fill={corePrimary}
            opacity="0.8"
            animate={{
              cx: [
                150 + 60 * Math.cos((2 * Math.PI * i) / 4),
                150 + 60 * Math.cos((2 * Math.PI * i) / 4 + 2 * Math.PI),
              ],
              cy: [
                115 + 60 * Math.sin((2 * Math.PI * i) / 4),
                115 + 60 * Math.sin((2 * Math.PI * i) / 4 + 2 * Math.PI),
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Connecting energy lines to particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`line-${i}`}
            x1="150"
            y1="115"
            x2={150 + 60 * Math.cos((2 * Math.PI * i) / 4)}
            y2={115 + 60 * Math.sin((2 * Math.PI * i) / 4)}
            stroke={isDragOver ? 'rgba(0, 217, 255, 0.4)' : corePrimary}
            strokeWidth="0.8"
            opacity="0.3"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              stroke: isDragOver ? 'rgba(0, 217, 255, 0.4)' : corePrimary,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Drop zone indicator - cyan glow when dragging over */}
        {isDragOver && (
          <motion.path
            d="M 100 160 C 70 160, 45 138, 45 110 C 45 85, 62 68, 82 68 C 85 40, 105 20, 130 20 C 160 20, 185 40, 190 68 C 220 71, 245 98, 245 130 C 245 160, 220 185, 190 185 L 110 185 C 85 185, 100 160, 100 160 Z"
            fill="none"
            stroke="rgba(0, 217, 255, 0.7)"
            strokeWidth="2"
            strokeDasharray="8,4"
            animate={{
              strokeDashoffset: [-12, 0],
              opacity: [0.5, 1],
            }}
            transition={{
              strokeDashoffset: { duration: 1, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        )}
      </motion.svg>
    </motion.div>
  );
}
