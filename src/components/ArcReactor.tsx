import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ArcReactorProps {
  isActive: boolean;
  powerLevel: number; // 0 to 1
  onDrop?: (reactorId: string) => void;
  isDragOver?: boolean;
}

export function ArcReactor({ isActive, powerLevel, onDrop, isDragOver }: ArcReactorProps) {
  // Generate particle positions
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      angle: (i / 20) * Math.PI * 2,
      radius: 40 + Math.random() * 30,
      delay: Math.random() * 0.5,
    }));
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const reactorId = e.dataTransfer.getData('text/plain');
    onDrop?.(reactorId);
  };

  return (
    <motion.div
      className="relative w-48 h-48 rounded-full flex items-center justify-center"
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
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            rgba(255, 107, 53, ${isDragOver ? 0.6 : powerLevel * 0.4}) 0%,
            rgba(0, 217, 255, ${isDragOver ? 0.4 : powerLevel * 0.2}) 50%,
            transparent 100%)`,
          filter: `blur(40px)`,
        }}
        animate={{
          opacity: isDragOver ? 1 : powerLevel,
        }}
      />

      {/* Drop zone indicator */}
      {isDragOver && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-dashed"
          style={{ borderColor: 'rgba(0, 217, 255, 0.8)' }}
          animate={{ scale: [0.95, 1.05] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* Rotating ring 1 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: '#FF6B35',
          borderRightColor: '#FF6B35',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Rotating ring 2 (opposite direction) */}
      <motion.div
        className="absolute inset-8 rounded-full border border-transparent"
        style={{
          borderTopColor: '#00D9FF',
          borderLeftColor: '#00D9FF',
          borderBottomColor: 'transparent',
          borderRightColor: 'transparent',
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Rotating ring 3 */}
      <motion.div
        className="absolute inset-16 rounded-full border border-transparent"
        style={{
          borderTopColor: '#0066FF',
          borderRightColor: '#0066FF',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Energy particles orbiting */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            background: `hsl(180, 100%, ${50 + powerLevel * 30}%)`,
            boxShadow: `0 0 ${8 + powerLevel * 12}px currentColor`,
          }}
          animate={{
            x: Math.cos(particle.angle) * particle.radius * powerLevel,
            y: Math.sin(particle.angle) * particle.radius * powerLevel,
            opacity: [0, powerLevel, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Core pulse */}
      <motion.div
        className="absolute w-16 h-16 rounded-full flex items-center justify-center"
        animate={{
          boxShadow: [
            `0 0 20px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 107, 53, 0.2)`,
            `0 0 40px rgba(255, 215, 0, ${powerLevel * 0.8}), inset 0 0 30px rgba(255, 107, 53, ${powerLevel * 0.4})`,
            `0 0 20px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 107, 53, 0.2)`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Inner core */}
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 border-2 border-yellow-200"
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Center spark */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 0.5],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
