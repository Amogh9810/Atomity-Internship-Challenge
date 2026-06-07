'use client';

import { FeatureSection } from '@/components/FeatureSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function Page() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full bg-slate-950">
        <FeatureSection />
      </main>
    </QueryClientProvider>
  );
}
