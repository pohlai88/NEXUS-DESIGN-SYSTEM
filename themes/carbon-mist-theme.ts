/**
 * Carbon Mist Theme
 * 
 * Enterprise-grade mid-luminance theme that lives between light and dark.
 * Inspired by GitHub, Linear, Vercel, and Raycast - but elevated.
 * 
 * Design Philosophy (5 Invariants):
 * 1. Mid-Luminance (L ≈ 18–28%) - Not white, not black
 * 2. Low-Saturation Core - Calm, professional, audit-friendly
 * 3. High-Precision Accents - Color appears only when meaning exists
 * 4. OLED-Friendly & WCAG-Safe - No pure black, no eye-burning white
 * 5. Looks Expensive at 1% Opacity - Real system, not a skin
 * 
 * Key Differentiators:
 * - Ambient Depth (micro-glow, frosted noise)
 * - Temperature Shift (cool idle → warm active)
 * - Aurora Teal accent (cool, stable, alive)
 * - Oxide Red for critical (not alarmist)
 * 
 * This is a platform theme, not a trend theme.
 */

import type { CustomTheme } from './theme-machine';

export const carbonMistTheme: CustomTheme = {
  name: 'carbon-mist',
  tokens: {
    // Base Palette - Mid-Luminance (L ≈ 18–28%)
    // Softer than black, OLED-safe, not eye-burning
    void: '#121417',              // bg.root - Softer than black, OLED-safe
    paper: '#171A1F',             // bg.surface - Elevation without borders
    paper2: '#1D2127',            // bg.panel - Card contrast
    paperHover: '#252932',        // Hover state - Subtle elevation
    white: '#ffffff',             // Pure white (rarely used)
    lux: '#E6E8EB',               // text.primary - Paper-ink ratio, no pure white
    luxDim: '#B3B8C2',            // text.secondary - Secondary text
    clay: '#7C8491',              // text.muted - Metadata/labels
    
    // Primary Accent - Aurora Teal (High-Precision)
    // Color appears only when meaning exists
    gold: '#4FD1C5',              // accent.main - Aurora Teal (cool, stable, alive)
    primary: '#4FD1C5',           // Maps to --color-primary
    primaryForeground: '#121417', // Dark text on teal (high contrast)
    
    // Primary Hover - Temperature Shift (warmer when active)
    // Idle = cooler, Active = warmer teal
    // Note: This is handled via CSS, but we define the base
    
    // Secondary Accent (Rare, Meaningful)
    secondary: '#2D3748',         // Neutral charcoal - Stable, versatile
    secondaryForeground: '#E6E8EB', // Light text
    
    // Accent Color - Subtle variation
    accent: '#4FD1C5',            // Same as primary (unified accent system)
    accentForeground: '#121417',  // Dark text
    
    // Status Colors - High-Precision (Meaningful Only)
    // Warning - Muted Amber (not alarmist)
    warning: '#F2C94C',           // Muted amber - Warm but not aggressive
    warningForeground: '#121417', // Dark text
    
    // Critical - Oxide Red (not error red, not alarmist)
    error: '#E5533D',             // Oxide red - Serious but not panic-inducing
    errorForeground: '#E6E8EB',   // Light text
    
    // Success - Soft Green (natural, calming)
    success: '#48BB78',           // Soft green - Natural, growth
    successForeground: '#121417', // Dark text
    
    // Info - Cool Blue (stable)
    info: '#4299E1',              // Cool blue - Stable, trustworthy
    infoForeground: '#E6E8EB',   // Light text
    
    // Strokes - Opacity-based, not lines
    stroke: 'rgba(124, 132, 145, 0.2)',      // Subtle borders (opacity-based)
    strokeStrong: 'rgba(124, 132, 145, 0.35)', // Hover borders
    strokeSoft: 'rgba(124, 132, 145, 0.1)',   // Soft borders
    
    // Semantic Mappings (Figma Standard)
    background: '#121417',        // bg.root
    foreground: '#E6E8EB',       // text.primary
    muted: '#1D2127',            // bg.panel
    mutedForeground: '#7C8491',  // text.muted
    card: '#171A1F',             // bg.surface
    cardForeground: '#E6E8EB',   // text.primary
    popover: '#171A1F',          // bg.surface
    popoverForeground: '#E6E8EB', // text.primary
    border: 'rgba(124, 132, 145, 0.2)', // Opacity-based border
    input: '#1D2127',            // bg.panel
    destructive: '#E5533D',      // Oxide red
    destructiveForeground: '#E6E8EB', // Light text
    ring: '#4FD1C5',             // Aurora Teal focus ring
    
    // Sidebar Colors
    sidebarBackground: '#121417',
    sidebarForeground: '#B3B8C2',
    sidebarPrimary: '#E6E8EB',
    sidebarPrimaryForeground: '#121417',
    sidebarAccent: '#1D2127',
    sidebarAccentForeground: '#E6E8EB',
    sidebarBorder: 'rgba(124, 132, 145, 0.2)',
    sidebarRing: '#4FD1C5',
  },
  cssVariables: {
    // Ambient Depth - Micro-Glow (Only on Interaction)
    '--shadow-glow-teal': '0 0 0 1px rgba(79, 209, 197, 0.25), 0 8px 24px rgba(0, 0, 0, 0.6)',
    '--shadow-glow-teal-subtle': '0 0 0 1px rgba(79, 209, 197, 0.15), 0 4px 12px rgba(0, 0, 0, 0.4)',
    
    // Aurora Accent Gradient (Very Subtle - Hero/Empty States Only)
    '--gradient-aurora': 'linear-gradient(135deg, rgba(79, 209, 197, 0.12), rgba(99, 102, 241, 0.08))',
    
    // Temperature Shift
    '--accent-idle': '#4FD1C5',      // Cool (idle)
    '--accent-active': '#63E6D8',    // Warmer teal (active)
    '--accent-subtle': 'rgba(79, 209, 197, 0.15)', // Subtle background
    
    // Frosted Noise (1-2% grain texture - removes "dead flat" feeling)
    '--noise-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
    
    // Smooth Transitions
    '--transition-premium': 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-smooth': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

