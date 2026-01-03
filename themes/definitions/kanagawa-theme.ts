/**
 * Kanagawa Theme
 * 
 * Inspired by the famous painting "The Great Wave off Kanagawa"
 * Completely ignores standard "blue/black" tech look in favor of
 * "muddy," ink-inspired colors.
 * 
 * Characteristics:
 * - Warm, dark blues and sumi-ink greys
 * - Feels like looking at an old Japanese painting
 * - Extremely stable for long-term reading
 * - Eliminates high-contrast whites
 * - Perfect mid-tone that feels like dark paper
 * 
 * Inspired by: rebelot/kanagawa.nvim
 */

import type { CustomTheme } from './theme-machine';

export const kanagawaTheme: CustomTheme = {
  name: 'kanagawa',
  tokens: {
    // Base Palette - Sumi-Ink & Warm Dark Blues
    // Feels like dark paper, not a screen
    void: '#1f1f28',              // Base - Sumi-ink black (warm, not pure)
    paper: '#2a2a37',             // Surface - Dark ink-grey
    paper2: '#363646',            // Panel - Medium ink-grey
    paperHover: '#41414d',        // Hover - Lighter ink-grey
    white: '#ffffff',            // Pure white (rarely used)
    lux: '#dcd7ba',               // Primary text - Warm paper-white
    luxDim: '#c8c093',            // Secondary text - Aged paper
    clay: '#727169',              // Meta/Label - Ink-grey
    
    // Primary Accent - Wave Blue (Warm Dark Blue)
    // Inspired by the wave in the painting
    gold: '#7e9cd8',              // Wave Blue - Warm dark blue
    primary: '#7e9cd8',           // Maps to --color-primary
    primaryForeground: '#1f1f28', // Dark text on blue
    
    // Accent - Spring Green (Natural, Organic)
    accent: '#98bb6c',            // Spring Green - Natural green
    accentForeground: '#1f1f28',  // Dark text
    
    // Secondary - Sumi-Ink (Neutral)
    secondary: '#363646',         // Sumi-Ink - Medium grey
    secondaryForeground: '#dcd7ba', // Warm paper text
    
    // Status Colors - Ink-Inspired
    success: '#76946a',           // Winter Green - Muted green (ink-like)
    successForeground: '#dcd7ba', // Warm text
    
    warning: '#c0a36e',           // Autumn Yellow - Warm amber (ink-like)
    warningForeground: '#1f1f28', // Dark text
    
    error: '#c34043',             // Katana Red - Deep red (ink-like)
    errorForeground: '#dcd7ba',   // Warm text
    
    info: '#7e9cd8',              // Wave Blue - Same as primary
    infoForeground: '#1f1f28',    // Dark text
    
    // Strokes - Ink-like borders
    stroke: 'rgba(114, 113, 105, 0.3)',      // Ink-grey borders
    strokeStrong: 'rgba(114, 113, 105, 0.45)', // Stronger borders
    strokeSoft: 'rgba(114, 113, 105, 0.2)',   // Soft borders
    
    // Semantic Mappings
    background: '#1f1f28',        // Base
    foreground: '#dcd7ba',       // Primary text (warm paper)
    muted: '#363646',            // Panel
    mutedForeground: '#727169',  // Meta
    card: '#2a2a37',             // Surface
    cardForeground: '#dcd7ba',   // Warm text
    popover: '#2a2a37',          // Surface
    popoverForeground: '#dcd7ba', // Warm text
    border: 'rgba(114, 113, 105, 0.3)', // Ink-grey
    input: '#363646',            // Panel
    destructive: '#c34043',       // Katana Red
    destructiveForeground: '#dcd7ba', // Warm text
    ring: '#7e9cd8',             // Wave Blue focus ring
    
    // Sidebar Colors
    sidebarBackground: '#1f1f28',
    sidebarForeground: '#c8c093',
    sidebarPrimary: '#dcd7ba',
    sidebarPrimaryForeground: '#1f1f28',
    sidebarAccent: '#363646',
    sidebarAccentForeground: '#dcd7ba',
    sidebarBorder: 'rgba(114, 113, 105, 0.3)',
    sidebarRing: '#7e9cd8',
  },
  cssVariables: {
    // Ink-wash effects
    '--shadow-glow-wave': '0 0 0 1px rgba(126, 156, 216, 0.25), 0 8px 24px rgba(0, 0, 0, 0.5)',
    '--shadow-glow-ink': '0 0 0 1px rgba(114, 113, 105, 0.2), 0 4px 16px rgba(0, 0, 0, 0.4)',
    
    // Ink-wash gradient (subtle)
    '--gradient-kanagawa': 'linear-gradient(135deg, rgba(126, 156, 216, 0.1), rgba(152, 187, 108, 0.06))',
    
    // Smooth, paper-like transitions
    '--transition-ink': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

