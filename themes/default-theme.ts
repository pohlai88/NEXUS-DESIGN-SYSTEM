/**
 * Default Theme (Neo-Analog)
 * 
 * This is the canonical default theme that matches input.css exactly.
 * The default theme uses GOLD (#eab308) as the primary color.
 * 
 * This theme is automatically applied when no custom theme is selected.
 * All values must match input.css exactly.
 */

import type { CustomTheme } from './theme-machine';

export const defaultTheme: CustomTheme = {
  name: 'default',
  tokens: {
    // Base Palette - Neo-Analog (from input.css)
    void: '#09090b',              // Main Background (Zinc-950)
    paper: '#121214',             // Panel Background (Zinc-900)
    paper2: '#18181b',            // Hover / Input (Zinc-800)
    paperHover: '#27272a',        // Hover state
    white: '#fff',                // Pure white for primary buttons
    lux: '#f4f4f5',               // Primary (Zinc-50)
    luxDim: '#a1a1aa',            // Secondary (Zinc-400)
    clay: '#71717a',              // Meta / Label (Zinc-500)
    
    // GOLD is the primary color (from input.css)
    gold: '#eab308',              // Accent (Amber-500) - THE PRIMARY COLOR
    primary: '#eab308',           // Maps to --color-primary (var(--color-gold))
    primaryForeground: '#09090b',  // Maps to --color-primary-foreground (var(--color-void))
    
    // Secondary & Accent
    secondary: '#18181b',         // Maps to --color-secondary (var(--color-paper-2))
    secondaryForeground: '#f4f4f5', // Maps to --color-secondary-foreground (var(--color-lux))
    accent: '#18181b',            // Maps to --color-accent (var(--color-paper-2))
    accentForeground: '#f4f4f5',  // Maps to --color-accent-foreground (var(--color-lux))
    
    // Status Colors (from input.css)
    success: '#10b981',           // Emerald-500
    warning: '#f59e0b',           // Amber-500
    error: '#f43f5e',             // Rose-500
    info: '#3b82f6',              // Blue-500
    
    // Strokes (from input.css)
    stroke: '#27272a',            // Panel Borders (Zinc-800)
    strokeStrong: '#3f3f46',      // Hover Borders (Zinc-700)
    strokeSoft: '#1f1f22',        // Soft borders
    
    // Semantic Mappings (from input.css - Figma Standard)
    background: '#09090b',        // var(--color-void)
    foreground: '#f4f4f5',       // var(--color-lux)
    muted: '#18181b',            // var(--color-paper-2)
    mutedForeground: '#71717a',  // var(--color-clay)
    card: '#121214',             // var(--color-paper)
    cardForeground: '#f4f4f5',   // var(--color-lux)
    popover: '#121214',          // var(--color-paper)
    popoverForeground: '#f4f4f5', // var(--color-lux)
    border: '#27272a',           // var(--color-stroke)
    input: '#27272a',            // var(--color-stroke)
    destructive: '#f43f5e',      // var(--color-error)
    destructiveForeground: '#f4f4f5', // var(--color-lux)
    ring: '#eab308',             // var(--color-gold) - GOLD focus ring
    
    // Sidebar Colors (from input.css)
    sidebarBackground: '#09090b',  // var(--color-void)
    sidebarForeground: '#a1a1aa',  // var(--color-lux-dim)
    sidebarPrimary: '#f4f4f5',     // var(--color-lux)
    sidebarPrimaryForeground: '#09090b', // var(--color-void)
    sidebarAccent: '#18181b',      // var(--color-paper-2)
    sidebarAccentForeground: '#f4f4f5', // var(--color-lux)
    sidebarBorder: '#27272a',      // var(--color-stroke)
    sidebarRing: '#eab308',        // var(--color-gold) - GOLD sidebar ring
  },
  cssVariables: {
    // No additional CSS variables needed - all values come from input.css
    // This theme IS the default, so it doesn't override anything
  },
};

