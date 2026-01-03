/**
 * Unified Token Registry
 * 
 * Single source of truth for mapping tokens across:
 * - Tailwind v4 (@theme block)
 * - ShadCN UI components
 * - Figma design variables
 * 
 * This enables runtime theme switching that works with all integrations.
 */

/**
 * Token Registry Maps
 * 
 * Maps custom theme token keys to their corresponding CSS variable names
 * in different systems.
 */
export const TOKEN_REGISTRY = {
  /**
   * Tailwind v4 Token Mapping
   * Maps custom token keys to Tailwind v4 @theme variable names
   */
  tailwind: {
    // Color primitives
    'void': '--color-void',
    'paper': '--color-paper',
    'paper2': '--color-paper-2',
    'paperHover': '--color-paper-hover',
    'white': '--color-white',
    'lux': '--color-lux',
    'luxDim': '--color-lux-dim',
    'clay': '--color-clay',
    'gold': '--color-gold',
    'stroke': '--color-stroke',
    'strokeStrong': '--color-stroke-strong',
    'strokeSoft': '--color-stroke-soft',
    'success': '--color-success',
    'warning': '--color-warning',
    'error': '--color-error',
    'info': '--color-info',
    
    // Semantic colors (Figma standard)
    'background': '--color-background',
    'foreground': '--color-foreground',
    'muted': '--color-muted',
    'mutedForeground': '--color-muted-foreground',
    'card': '--color-card',
    'cardForeground': '--color-card-foreground',
    'popover': '--color-popover',
    'popoverForeground': '--color-popover-foreground',
    'border': '--color-border',
    'input': '--color-input',
    'primary': '--color-primary',
    'primaryForeground': '--color-primary-foreground',
    'secondary': '--color-secondary',
    'secondaryForeground': '--color-secondary-foreground',
    'accent': '--color-accent',
    'accentForeground': '--color-accent-foreground',
    'destructive': '--color-destructive',
    'destructiveForeground': '--color-destructive-foreground',
    'ring': '--color-ring',
    
    // Font families
    'fontFamilySans': '--font-family-sans',
    'fontFamilySerif': '--font-family-serif',
    'fontFamilyMono': '--font-family-mono',
    
    // Font weights
    'fontWeightThin': '--font-weight-thin',
    'fontWeightExtralight': '--font-weight-extralight',
    'fontWeightLight': '--font-weight-light',
    'fontWeightNormal': '--font-weight-normal',
    'fontWeightMedium': '--font-weight-medium',
    'fontWeightSemibold': '--font-weight-semibold',
    'fontWeightBold': '--font-weight-bold',
    'fontWeightExtrabold': '--font-weight-extrabold',
    'fontWeightBlack': '--font-weight-black',
    
    // Font sizes
    'fontSizeXs': '--font-size-xs',
    'fontSizeSm': '--font-size-sm',
    'fontSizeBase': '--font-size-base',
    'fontSizeLg': '--font-size-lg',
    'fontSizeXl': '--font-size-xl',
    'fontSize2xl': '--font-size-2xl',
    'fontSize3xl': '--font-size-3xl',
    'fontSize4xl': '--font-size-4xl',
    'fontSize5xl': '--font-size-5xl',
    'fontSize6xl': '--font-size-6xl',
    'fontSize7xl': '--font-size-7xl',
    'fontSize8xl': '--font-size-8xl',
    'fontSize9xl': '--font-size-9xl',
    
    // Spacing
    'spacing0': '--spacing-0',
    'spacingPx': '--spacing-px',
    'spacing0_5': '--spacing-0_5',
    'spacing1': '--spacing-1',
    'spacing1_5': '--spacing-1_5',
    'spacing2': '--spacing-2',
    'spacing2_5': '--spacing-2_5',
    'spacing3': '--spacing-3',
    'spacing3_5': '--spacing-3_5',
    'spacing4': '--spacing-4',
    'spacing5': '--spacing-5',
    'spacing6': '--spacing-6',
    'spacing7': '--spacing-7',
    'spacing8': '--spacing-8',
    'spacing9': '--spacing-9',
    'spacing10': '--spacing-10',
    'spacing11': '--spacing-11',
    'spacing12': '--spacing-12',
    'spacing14': '--spacing-14',
    'spacing16': '--spacing-16',
    'spacing20': '--spacing-20',
    'spacing24': '--spacing-24',
    'spacing28': '--spacing-28',
    'spacing32': '--spacing-32',
    'spacing36': '--spacing-36',
    'spacing40': '--spacing-40',
    'spacing44': '--spacing-44',
    'spacing48': '--spacing-48',
    'spacing52': '--spacing-52',
    'spacing56': '--spacing-56',
    'spacing60': '--spacing-60',
    'spacing64': '--spacing-64',
    'spacing72': '--spacing-72',
    'spacing80': '--spacing-80',
    'spacing96': '--spacing-96',
    
    // Border radius
    'radiusNone': '--radius-none',
    'radiusXs': '--radius-xs',
    'radiusSm': '--radius-sm',
    'radiusMd': '--radius-md',
    'radiusLg': '--radius-lg',
    'radiusXl': '--radius-xl',
    'radius2xl': '--radius-2xl',
    'radius3xl': '--radius-3xl',
    'radiusFull': '--radius-full',
    'radiusCard': '--radius-card',
    'radiusPanel': '--radius-panel',
    'radiusControl': '--radius-control',
  } as Record<string, string>,

  /**
   * ShadCN UI Token Mapping
   * Maps custom token keys to ShadCN CSS variable names
   * ShadCN uses these variables for component theming
   */
  shadcn: {
    'background': '--color-background',
    'foreground': '--color-foreground',
    'muted': '--color-muted',
    'mutedForeground': '--color-muted-foreground',
    'card': '--color-card',
    'cardForeground': '--color-card-foreground',
    'popover': '--color-popover',
    'popoverForeground': '--color-popover-foreground',
    'border': '--color-border',
    'input': '--color-input',
    'primary': '--color-primary',
    'primaryForeground': '--color-primary-foreground',
    'secondary': '--color-secondary',
    'secondaryForeground': '--color-secondary-foreground',
    'accent': '--color-accent',
    'accentForeground': '--color-accent-foreground',
    'destructive': '--color-destructive',
    'destructiveForeground': '--color-destructive-foreground',
    'ring': '--color-ring',
    
    // Sidebar colors (if used)
    'sidebarBackground': '--color-sidebar-background',
    'sidebarForeground': '--color-sidebar-foreground',
    'sidebarPrimary': '--color-sidebar-primary',
    'sidebarPrimaryForeground': '--color-sidebar-primary-foreground',
    'sidebarAccent': '--color-sidebar-accent',
    'sidebarAccentForeground': '--color-sidebar-accent-foreground',
    'sidebarBorder': '--color-sidebar-border',
    'sidebarRing': '--color-sidebar-ring',
  } as Record<string, string>,

  /**
   * Figma Variable Mapping
   * Maps Figma variable names (color/background format) to Tailwind v4 tokens
   * Used when syncing from Figma MCP
   */
  figma: {
    'color/background': '--color-void',
    'color/surface': '--color-paper',
    'color/surface/hover': '--color-paper-hover',
    'color/text/primary': '--color-lux',
    'color/text/secondary': '--color-lux-dim',
    'color/text/meta': '--color-clay',
    'color/accent': '--color-gold',
    'color/border': '--color-stroke',
    'color/border/strong': '--color-stroke-strong',
    'color/border/soft': '--color-stroke-soft',
    'color/success': '--color-success',
    'color/warning': '--color-warning',
    'color/error': '--color-error',
    'color/info': '--color-info',
    'spacing/base': '--spacing-6',
    'spacing/small': '--spacing-4',
    'spacing/large': '--spacing-8',
    'typography/font-family/sans': '--font-family-sans',
    'typography/font-family/serif': '--font-family-serif',
    'typography/font-family/mono': '--font-family-mono',
    'radius/card': '--radius-card',
    'radius/panel': '--radius-panel',
    'radius/control': '--radius-control',
  } as Record<string, string>,
} as const;

/**
 * Reverse mapping: CSS variable → custom token key
 * Used for reading current theme values
 */
export function getTokenKeyFromCSSVar(cssVar: string): string | null {
  // Check Tailwind mapping
  for (const [key, value] of Object.entries(TOKEN_REGISTRY.tailwind)) {
    if (value === cssVar) return key;
  }
  
  // Check ShadCN mapping
  for (const [key, value] of Object.entries(TOKEN_REGISTRY.shadcn)) {
    if (value === cssVar) return key;
  }
  
  return null;
}

/**
 * Get Tailwind v4 CSS variable name for a custom token key
 */
export function getTailwindToken(customKey: string): string | null {
  return TOKEN_REGISTRY.tailwind[customKey] || null;
}

/**
 * Get ShadCN CSS variable name for a custom token key
 */
export function getShadcnToken(customKey: string): string | null {
  return TOKEN_REGISTRY.shadcn[customKey] || null;
}

/**
 * Get Tailwind v4 CSS variable name from Figma variable name
 */
export function getTailwindFromFigma(figmaKey: string): string | null {
  return TOKEN_REGISTRY.figma[figmaKey] || null;
}

/**
 * Convert custom token key to kebab-case CSS variable name
 * Falls back to --aibos-* prefix if not in registry
 */
export function normalizeTokenKey(key: string): string {
  // Check if it's already a CSS variable
  if (key.startsWith('--')) {
    return key;
  }
  
  // Check registry first
  const tailwindVar = TOKEN_REGISTRY.tailwind[key];
  if (tailwindVar) {
    return tailwindVar;
  }
  
  // Fallback to --aibos-* format for unknown tokens
  return `--aibos-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

