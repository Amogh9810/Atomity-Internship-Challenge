import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  color: string;
  isVisible: boolean;
  index: number;
}

export function MetricCard({
  label,
  value,
  unit,
  color,
  isVisible,
  index,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(0);
      return;
    }

    const startTime = Date.now();
    const duration = 2000; // 2 second count-up

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth count-up
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(value * easeOutQuad);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  // Map color class to actual color hex
  const colorMap: Record<string, string> = {
    'from-green-500 to-emerald-600': '#22c55e',
    'from-cyan-500 to-blue-600': '#06b6d4',
    'from-purple-500 to-pink-600': '#a855f7',
    'from-orange-500 to-red-600': '#f97316',
    'from-yellow-500 to-orange-600': '#eab308',
    'from-blue-500 to-cyan-600': '#3b82f6',
    'from-red-500 to-orange-600': '#ef4444',
  };
  
  const borderColor = colorMap[color] || '#06b6d4';

  return (
    <motion.div
      className="metric-card relative overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/50 card-content backdrop-blur-sm transition-colors duration-200 accent-hover"
      style={{
        borderLeft: `3px solid ${borderColor}`,
        // Use color-mix() to blend border color with primary
        boxShadow: `inset 0 0 20px color-mix(in srgb, ${borderColor} 10%, transparent)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.6 + index * 0.15,
      }}
      whileHover={{ scale: 1.05, borderColor: '#00D9FF' }}
    >
      {/* Gradient background accent with color-mix() for dynamic blending */}
      <div
        className={`absolute inset-0 opacity-0 hover:opacity-10 transition-opacity pointer-events-none bg-gradient-to-br ${color}`}
        style={{
          // Use color-mix to dynamically blend border color with background
          backgroundColor: `color-mix(in srgb, ${borderColor} 15%, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Label */}
        <p className="text-sm font-medium text-cyan-300 mb-2 uppercase tracking-wider">
          {label}
        </p>

        {/* Value */}
        <motion.div className="mb-3">
          <motion.span
            className={`text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          >
            {displayValue}
          </motion.span>
          <span className="text-xl font-semibold text-cyan-300 ml-1">
            {unit}
          </span>
        </motion.div>

        {/* Progress bar with modern CSS */}
        <div className="progress-bar relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${displayValue}%` } : { width: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
