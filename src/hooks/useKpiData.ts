import { useQuery } from '@tanstack/react-query';

export interface KpiMetric {
  label: string;
  value: number;
  unit: string;
  color: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Map provider IDs to JSONPlaceholder endpoints
const providerEndpoints: Record<string, number> = {
  default: 1,
  'Amazon Web Services': 2,
  'Microsoft Azure': 3,
  'Google Cloud': 4,
  'On-Premise': 5,
};

// Transform API data into KPI metrics
function transformApiDataToMetrics(posts: Post[], providerId: string): KpiMetric[] {
  const providerIndex = providerEndpoints[providerId] || 1;
  
  // Use API data to compute metrics dynamically
  const baseValue = posts.length * 10;
  const latencyBase = 25 - providerIndex * 2;
  const uptimeBase = 99.85 + providerIndex * 0.03;
  const efficiencyBase = 90 + providerIndex;
  
  return [
    {
      label: 'Cost Reduction',
      value: Math.min(99.99, uptimeBase),
      unit: '%',
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Resource Efficiency',
      value: Math.max(5, latencyBase) * 10,
      unit: '%',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      label: 'Optimization Score',
      value: 80 + baseValue / 10,
      unit: '/100',
      color: 'from-purple-500 to-pink-600',
    },
    {
      label: 'Savings Generated',
      value: Math.min(99, efficiencyBase),
      unit: '%',
      color: 'from-orange-500 to-red-600',
    },
  ];
}

async function fetchKpiData(providerId?: string): Promise<KpiMetric[]> {
  const provider = providerId || 'default';
  const postId = providerEndpoints[provider] || 1;
  
  try {
    // Fetch data from JSONPlaceholder public API
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    
    const posts: Post[] = await response.json();
    return transformApiDataToMetrics(posts, provider);
  } catch (error) {
    console.error(' Error fetching KPI data:', error);
    throw error;
  }
}

export function useKpiData(providerId?: string) {
  return useQuery({
    queryKey: ['kpi-metrics', providerId],
    queryFn: () => fetchKpiData(providerId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });
}
