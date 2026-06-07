// Design tokens for Arc Reactor theme
// Primary pattern: Use CSS variables from --token-name
// These are defined in globals.css with actual hex values
export const tokens = {
  colors: {
    // Primary energy colors - reference CSS variables
    primary: 'var(--color-primary)', // Cyan glow
    primaryDark: 'var(--color-primary-dark)',
    secondary: 'var(--color-secondary)', // Electric blue
    
    // Arc Reactor specific
    reactorCore: 'var(--color-reactor-core)', // Gold center
    reactorGlow: 'var(--color-reactor-glow)', // Orange glow
    energyPulse: 'var(--color-energy-pulse)',
    
    // Neutral palette
    background: 'var(--color-background)', // Dark navy
    surface: 'var(--color-surface)',
    surfaceLight: 'var(--color-surface-light)',
    
    // Text
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',
    
    // Functional
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  },
  
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)',
  },
  
  radii: {
    none: '0',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: '9999px',
  },
  
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    glow: 'var(--shadow-glow)',
    glowIntense: 'var(--shadow-glow-intense)',
    reactorGlow: 'var(--shadow-reactor-glow)',
  },
  
  animation: {
    fast: '200ms',
    base: '300ms',
    slow: '500ms',
    verySlow: '800ms',
    
    // Spring physics
    spring: {
      smooth: { type: 'spring', stiffness: 100, damping: 10 },
      snappy: { type: 'spring', stiffness: 150, damping: 12 },
      bouncy: { type: 'spring', stiffness: 80, damping: 8 },
    },
  },
  
  typography: {
    // Heading styles
    h1: {
      size: 'clamp(1.5rem, 5vw, 3rem)',
      weight: 700,
      lineHeight: 1.2,
    },
    h2: {
      size: 'clamp(1.25rem, 4vw, 2rem)',
      weight: 700,
      lineHeight: 1.3,
    },
    h3: {
      size: 'clamp(1rem, 3vw, 1.5rem)',
      weight: 600,
      lineHeight: 1.4,
    },
    // Body text
    body: {
      size: '1rem',
      weight: 400,
      lineHeight: 1.6,
    },
    bodySmall: {
      size: '0.875rem',
      weight: 400,
      lineHeight: 1.5,
    },
  },
} as const;

// CSS variable definitions for use in stylesheets
export const tokensCss = `
  :root {
    --color-primary: ${tokens.colors.primary};
    --color-primary-dark: ${tokens.colors.primaryDark};
    --color-secondary: ${tokens.colors.secondary};
    --color-reactor-core: ${tokens.colors.reactorCore};
    --color-reactor-glow: ${tokens.colors.reactorGlow};
    --color-energy-pulse: ${tokens.colors.energyPulse};
    --color-background: ${tokens.colors.background};
    --color-surface: ${tokens.colors.surface};
    --color-surface-light: ${tokens.colors.surfaceLight};
    --color-text-primary: ${tokens.colors.textPrimary};
    --color-text-secondary: ${tokens.colors.textSecondary};
    --color-text-muted: ${tokens.colors.textMuted};
    --color-success: ${tokens.colors.success};
    --color-warning: ${tokens.colors.warning};
    --color-error: ${tokens.colors.error};
    
    --spacing-xs: ${tokens.spacing.xs};
    --spacing-sm: ${tokens.spacing.sm};
    --spacing-md: ${tokens.spacing.md};
    --spacing-lg: ${tokens.spacing.lg};
    --spacing-xl: ${tokens.spacing.xl};
    --spacing-2xl: ${tokens.spacing['2xl']};
    --spacing-3xl: ${tokens.spacing['3xl']};
    
    --radius-sm: ${tokens.radii.sm};
    --radius-md: ${tokens.radii.md};
    --radius-lg: ${tokens.radii.lg};
    --radius-xl: ${tokens.radii.xl};
    --radius-full: ${tokens.radii.full};
    
    --shadow-sm: ${tokens.shadows.sm};
    --shadow-md: ${tokens.shadows.md};
    --shadow-lg: ${tokens.shadows.lg};
    --shadow-glow: ${tokens.shadows.glow};
    --shadow-glow-intense: ${tokens.shadows.glowIntense};
    --shadow-reactor-glow: ${tokens.shadows.reactorGlow};
  }
`;
