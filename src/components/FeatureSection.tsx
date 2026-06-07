'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKpiData } from '@/hooks/useKpiData';
import { CloudCore } from './CloudCore';
import { SmallReactor } from './SmallReactor';
import { MetricCard } from './MetricCard';

const SMALL_REACTORS = [
  { id: 'aws', name: 'AWS', provider: 'AWS' },
  { id: 'azure', name: 'Azure', provider: 'Azure' },
  { id: 'gcp', name: 'GCP', provider: 'GCP' },
  { id: 'onprem', name: 'On-Prem', provider: 'On-Prem' },
];

export function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedReactorId, setSelectedReactorId] = useState<string | null>(null);
  const [powerLevel, setPowerLevel] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedReactorId, setDraggedReactorId] = useState<string | null>(null);

  const { data: kpiMetrics, isLoading, error } = useKpiData(
    selectedReactorId ? selectedReactorId.toUpperCase() === 'ONPREM' ? 'On-Prem' : SMALL_REACTORS.find(r => r.id === selectedReactorId)?.provider : undefined
  );

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const interval = setInterval(() => {
            setPowerLevel((prev) => Math.min(prev + 0.02, 1));
          }, 30);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, reactorId: string) => {
    setDraggedReactorId(reactorId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', reactorId);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedReactorId(null);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (reactorId: string) => {
    setSelectedReactorId(reactorId);
    setIsDragOver(false);
    setDraggedReactorId(null);
  };

  const showKpis = powerLevel > 0.5;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3 text-balance">
            Cloud Intelligence Engine
          </h2>
          <p className="text-base text-cyan-300 max-w-2xl mx-auto">
            Drag cloud providers into the core to view their optimization metrics
          </p>
        </motion.div>

        {/* Main Layout: Left (Clouds) + Right (Metrics) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-screen">
          {/* LEFT: Cloud Core + Small Clouds */}
          <motion.div
            className="flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Central Cloud Core */}
            <div
              className="relative transition-all duration-300"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <CloudCore
                isActive={isVisible}
                powerLevel={powerLevel}
                onDrop={(e) => {
                  e.preventDefault();
                  const reactorId = e.dataTransfer.getData('text/plain');
                  handleDrop(reactorId);
                }}
                isDragOver={isDragOver}
                selectedProviderId={selectedReactorId}
              />
            </div>

            {/* Small Cloud Providers Grid */}
            <div className="grid grid-cols-2 gap-12">
              {SMALL_REACTORS.map((reactor) => (
                <motion.div
                  key={reactor.id}
                  animate={{
                    opacity: draggedReactorId === reactor.id ? 0.5 : 1,
                  }}
                >
                  <SmallReactor
                    id={reactor.id}
                    name={reactor.name}
                    provider={reactor.provider}
                    isDragging={draggedReactorId === reactor.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                </motion.div>
              ))}
            </div>

            {/* Selected indicator */}
            {selectedReactorId && (
              <motion.p className="text-center text-cyan-300 text-sm">
                {SMALL_REACTORS.find(r => r.id === selectedReactorId)?.name} Connected
              </motion.p>
            )}
          </motion.div>

          {/* RIGHT: Metrics Cards */}
          <motion.div
            className="flex flex-col justify-center h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isLoading && !error && kpiMetrics ? (
                <motion.div
                  key={selectedReactorId || 'default'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-5xl font-bold text-white mb-10">
                    {selectedReactorId
                      ? `${SMALL_REACTORS.find(r => r.id === selectedReactorId)?.name} Metrics`
                      : 'System Metrics'}
                  </h3>
                  <div className="space-y-5">
                    {kpiMetrics.map((metric, index) => (
                      <MetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        unit={metric.unit}
                        color={metric.color}
                        isVisible={showKpis}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : isLoading ? (
                <div className="text-center text-cyan-300">Loading metrics...</div>
              ) : error ? (
                <div className="text-center text-red-400">Failed to load metrics</div>
              ) : null}
            </AnimatePresence>

            {!selectedReactorId && (
              <motion.p className="text-cyan-400/60 text-sm mt-8">
                Drag a cloud provider to view its detailed metrics
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
