import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface EnergyLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isActive: boolean;
  isHighlighted: boolean;
  index: number;
}

export function EnergyLine({
  fromX,
  fromY,
  toX,
  toY,
  isActive,
  isHighlighted,
  index,
}: EnergyLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate line properties
  const dx = toX - fromX;
  const dy = toY - fromY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const animate = () => {
      const offset = (Date.now() / 30) % length;
      svg.style.setProperty('--dash-offset', String(offset));
      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [length]);

  return (
    <svg
      ref={svgRef}
      className="absolute"
      style={{
        left: `${fromX}%`,
        top: `${fromY}%`,
        width: `${Math.abs(dx)}px`,
        height: `${Math.abs(dy)}px`,
        transform: `translate(${dx < 0 ? dx : 0}px, ${dy < 0 ? dy : 0}px)`,
        overflow: 'visible',
      }}
      viewBox={`0 0 ${Math.abs(dx)} ${Math.abs(dy)}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={`gradient-${index}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.3" />
        </linearGradient>

        <filter id={`glow-${index}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background line for structure */}
      <motion.line
        x1="0"
        y1="0"
        x2={Math.abs(dx)}
        y2={Math.abs(dy)}
        stroke="rgba(0, 217, 255, 0.1)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, delay: index * 0.15 }}
      />

      {/* Main energy line with pulse */}
      <motion.line
        x1="0"
        y1="0"
        x2={Math.abs(dx)}
        y2={Math.abs(dy)}
        stroke={`url(#gradient-${index})`}
        strokeWidth={isHighlighted ? 4 : 2}
        filter={`url(#glow-${index})`}
        strokeDasharray={length}
        strokeDashoffset={0}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                pathLength: 1,
                opacity: 1,
                strokeWidth: isHighlighted ? 4 : 2,
              }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 1.5, delay: index * 0.15 + 0.2 },
          opacity: { duration: 0.8, delay: index * 0.15 + 0.2 },
          strokeWidth: { duration: 0.3 },
        }}
      />

      {/* Energy pulse particles */}
      {isActive && (
        <motion.circle
          cx="0"
          cy="0"
          r="3"
          fill="#00FF88"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.abs(dx),
            y: Math.abs(dy),
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: isHighlighted ? 0.8 : 1.2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: index * 0.1,
          }}
        />
      )}
    </svg>
  );
}
