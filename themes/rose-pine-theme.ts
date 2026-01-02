/**
 * Rosé Pine Theme
 * 
 * "All natural pine, faux fur and a bit of soho vibes."
 * 
 * A sophisticated, luxurious theme with deep, rich, muted violet/charcoal backgrounds.
 * Not a standard dark mode - feels like a filtered photograph.
 * 
 * Characteristics:
 * - Deep, dusty lavender-grey background (not void black)
 * - Warm, muted pastels that don't hurt the eyes
 * - Luxury, soho vibes aesthetic
 * - Very "pretty" and "stable"
 * - Between light and dark - mid-tone sophistication
 * 
 * Inspired by: rose-pine/neovim, rose-pine/vscode
 */

import type { CustomTheme } from './theme-machine';

export const rosePineTheme: CustomTheme = {
  name: 'rose-pine',
  tokens: {
    // Base Palette - Deep, Rich, Muted Violet/Charcoal
    // Feels like a filtered photograph, not a screen
    void: '#191724',              // Base - Deep dusty lavender-grey (not black)
    paper: '#1f1d2e',             // Surface - Rich violet-charcoal
    paper2: '#26233a',            // Panel - Muted purple-grey
    paperHover: '#2a273f',         // Hover - Slightly lighter violet
    white: '#ffffff',             // Pure white (rarely used)
    lux: '#e0def4',               // Primary text - Soft lavender-white
    luxDim: '#908caa',            // Secondary text - Muted lavender-grey
    clay: '#6e6a86',              // Meta/Label - Dusty purple-grey
    
    // Primary Accent - Rosé (Warm Pink-Rose)
    // The signature color - warm, inviting, sophisticated
    gold: '#eb6f92',              // Rosé - Warm pink-rose
    primary: '#eb6f92',           // Maps to --color-primary
    primaryForeground: '#191724', // Dark text on rosé
    
    // Accent - Pine (Muted Green)
    // Natural, organic feel
    accent: '#31748f',            // Pine - Muted teal-green
    accentForeground: '#e0def4',  // Light text
    
    // Secondary - Foam (Soft Blue-Grey)
    secondary: '#26233a',         // Foam - Muted purple-grey
    secondaryForeground: '#e0def4', // Light text
    
    // Status Colors - Muted, Pastel
    success: '#9ccfd8',          // Foam - Soft cyan (gentle success)
    successForeground: '#191724', // Dark text
    
    warning: '#f6c177',           // Gold - Warm amber (not aggressive)
    warningForeground: '#191724', // Dark text
    
    error: '#eb6f92',             // Rosé - Same as primary (gentle error)
    errorForeground: '#191724',   // Dark text
    
    info: '#31748f',              // Pine - Muted teal
    infoForeground: '#e0def4',    // Light text
    
    // Strokes - Subtle, opacity-based
    stroke: 'rgba(110, 106, 134, 0.25)',      // Dusty purple borders
    strokeStrong: 'rgba(110, 106, 134, 0.4)', // Stronger borders
    strokeSoft: 'rgba(110, 106, 134, 0.15)',   // Soft borders
    
    // Semantic Mappings
    background: '#191724',        // Base
    foreground: '#e0def4',       // Primary text
    muted: '#26233a',            // Panel
    mutedForeground: '#6e6a86',  // Meta
    card: '#1f1d2e',             // Surface
    cardForeground: '#e0def4',   // Light text
    popover: '#1f1d2e',          // Surface
    popoverForeground: '#e0def4', // Light text
    border: 'rgba(110, 106, 134, 0.25)', // Dusty purple
    input: '#26233a',            // Panel
    destructive: '#eb6f92',      // Rosé (gentle)
    destructiveForeground: '#191724', // Dark text
    ring: '#eb6f92',             // Rosé focus ring
    
    // Sidebar Colors
    sidebarBackground: '#191724',
    sidebarForeground: '#908caa',
    sidebarPrimary: '#e0def4',
    sidebarPrimaryForeground: '#191724',
    sidebarAccent: '#26233a',
    sidebarAccentForeground: '#e0def4',
    sidebarBorder: 'rgba(110, 106, 134, 0.25)',
    sidebarRing: '#eb6f92',
  },
  cssVariables: {
    // Warm, luxurious glow
    '--shadow-glow-rose': '0 0 0 1px rgba(235, 111, 146, 0.2), 0 8px 24px rgba(0, 0, 0, 0.5)',
    '--shadow-glow-pine': '0 0 0 1px rgba(49, 116, 143, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4)',
    
    // Soho vibes gradient
    '--gradient-rose-pine': 'linear-gradient(135deg, rgba(235, 111, 146, 0.1), rgba(49, 116, 143, 0.08))',
    
    // Smooth, luxurious transitions
    '--transition-luxury': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

