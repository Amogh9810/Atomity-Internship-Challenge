import { motion } from 'framer-motion';
import { useState } from 'react';

interface CloudProviderProps {
  name: string;
  index: number;
  position: { x: number; y: number };
  isActive: boolean;
  onHover: (isHovered: boolean) => void;
}

export function CloudProvider({
  name,
  index,
  position,
  isActive,
  onHover,
}: CloudProviderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: index * 0.15,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        style={{
          width: 80,
          height: 80,
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Core node */}
      <motion.div
        className="relative w-16 h-16 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center cursor-pointer overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 217, 255, 0.8), inset 0 0 20px rgba(0, 217, 255, 0.3)'
            : '0 0 15px rgba(0, 217, 255, 0.5), inset 0 0 10px rgba(0, 217, 255, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner rotating ring */}
        <motion.div
          className="absolute inset-1 rounded-full border border-cyan-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Pulsing center dot */}
        <motion.div
          className="w-3 h-3 rounded-full bg-cyan-400 relative z-10"
          animate={{
            scale: isHovered ? 1.5 : 1,
            boxShadow: isHovered
              ? '0 0 12px rgba(0, 217, 255, 1)'
              : '0 0 6px rgba(0, 217, 255, 0.7)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Energy particles around the node */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-300"
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              x: Math.cos((i / 3) * Math.PI * 2) * 24,
              y: Math.sin((i / 3) * Math.PI * 2) * 24,
              opacity: isHovered ? [0, 1, 0] : [0, 0.5, 0],
            }}
            transition={{
              duration: isHovered ? 0.8 : 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute top-full mt-4 whitespace-nowrap text-sm font-semibold text-cyan-300"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.15 + 0.2 }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
}
