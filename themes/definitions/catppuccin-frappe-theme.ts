/**
 * Catppuccin Frappé Theme
 * 
 * "Soothing pastel" theme - the middle ground between light and dark.
 * Specifically designed to be lighter than dark, darker than light.
 * 
 * Characteristics:
 * - Soothing pastel colors
 * - Modern, playful, fancy without being distracting
 * - Low-contrast, greyish-blue base
 * - Rests gently in the middle spectrum
 * - Very stable for extended use
 * 
 * Inspired by: catppuccin/vscode (Frappé flavor)
 */

import type { CustomTheme } from './theme-machine';

export const catppuccinFrappeTheme: CustomTheme = {
  name: 'catppuccin-frappe',
  tokens: {
    // Base Palette - Soothing Mid-Tone Greyish-Blue
    // Lighter than dark, darker than light
    void: '#303446',              // Base - Soft greyish-blue (mid-tone)
    paper: '#292c3c',             // Surface - Slightly darker grey-blue
    paper2: '#232634',            // Panel - Darker grey-blue
    paperHover: '#363a4f',        // Hover - Lighter grey-blue
    white: '#ffffff',             // Pure white
    lux: '#c6d0f5',               // Primary text - Soft lavender-white
    luxDim: '#a5adce',            // Secondary text - Muted lavender
    clay: '#838ba7',              // Meta/Label - Greyish-lavender
    
    // Primary Accent - Blue (Soothing Pastel)
    gold: '#8caaee',              // Blue - Soothing pastel blue
    primary: '#8caaee',           // Maps to --color-primary
    primaryForeground: '#303446',  // Dark text on blue
    
    // Accent - Mauve (Playful Purple)
    accent: '#ca9ee6',            // Mauve - Playful pastel purple
    accentForeground: '#303446',  // Dark text
    
    // Secondary - Surface (Neutral)
    secondary: '#414559',          // Surface - Neutral grey-blue
    secondaryForeground: '#c6d0f5', // Light text
    
    // Status Colors - Soothing Pastels
    success: '#a6d189',           // Green - Soft pastel green
    successForeground: '#303446',  // Dark text
    
    warning: '#e5c890',           // Yellow - Warm pastel yellow
    warningForeground: '#303446', // Dark text
    
    error: '#e78284',             // Red - Soft pastel red (not aggressive)
    errorForeground: '#303446',    // Dark text
    
    info: '#99d1db',              // Sky - Soft pastel cyan
    infoForeground: '#303446',    // Dark text
    
    // Strokes - Soft, pastel borders
    stroke: 'rgba(131, 139, 167, 0.3)',      // Greyish-lavender borders
    strokeStrong: 'rgba(131, 139, 167, 0.45)', // Stronger borders
    strokeSoft: 'rgba(131, 139, 167, 0.2)',   // Soft borders
    
    // Semantic Mappings
    background: '#303446',        // Base
    foreground: '#c6d0f5',       // Primary text
    muted: '#232634',            // Panel
    mutedForeground: '#838ba7',  // Meta
    card: '#292c3c',             // Surface
    cardForeground: '#c6d0f5',   // Light text
    popover: '#292c3c',          // Surface
    popoverForeground: '#c6d0f5', // Light text
    border: 'rgba(131, 139, 167, 0.3)', // Greyish-lavender
    input: '#232634',            // Panel
    destructive: '#e78284',      // Soft red
    destructiveForeground: '#303446', // Dark text
    ring: '#8caaee',             // Blue focus ring
    
    // Sidebar Colors
    sidebarBackground: '#303446',
    sidebarForeground: '#a5adce',
    sidebarPrimary: '#c6d0f5',
    sidebarPrimaryForeground: '#303446',
    sidebarAccent: '#232634',
    sidebarAccentForeground: '#c6d0f5',
    sidebarBorder: 'rgba(131, 139, 167, 0.3)',
    sidebarRing: '#8caaee',
  },
  cssVariables: {
    // Soft, pastel glows
    '--shadow-glow-blue': '0 0 0 1px rgba(140, 170, 238, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3)',
    '--shadow-glow-mauve': '0 0 0 1px rgba(202, 158, 230, 0.2), 0 4px 16px rgba(0, 0, 0, 0.25)',
    
    // Playful gradient
    '--gradient-frappe': 'linear-gradient(135deg, rgba(140, 170, 238, 0.1), rgba(202, 158, 230, 0.08))',
    
    // Smooth, playful transitions
    '--transition-playful': 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

