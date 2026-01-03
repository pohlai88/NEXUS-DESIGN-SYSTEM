/**
 * Gold Glow Theme
 * 
 * Designed specifically for the vibrant gold #eab308 to "glow instead of scream."
 * Uses a warm, deep stone/charcoal background (mid-tone) that makes gold look
 * sophisticated, stable, and luxurious.
 * 
 * Philosophy:
 * - Keep the vibrant gold #eab308 (don't mute it)
 * - Change the background to mid-tone (not pure black)
 * - Make gold "glow" rather than "scream"
 * - Stable, fancy, luxurious feel
 * 
 * Inspired by Gruvbox Material's approach to gold accents on warm backgrounds.
 */

import type { CustomTheme } from './theme-machine';

export const goldGlowTheme: CustomTheme = {
  name: 'gold-glow',
  tokens: {
    // Base Palette - Warm, Deep Stone/Charcoal (Mid-Tone)
    // Not pure black - a rich, dark sepia/grey that makes gold glow
    void: '#1d2021',              // Base - Warm dark stone (not pure black)
    paper: '#282828',              // Surface - Rich charcoal-grey
    paper2: '#3c3836',             // Panel - Medium warm grey
    paperHover: '#504945',         // Hover - Lighter warm grey
    white: '#ffffff',             // Pure white
    lux: '#ebdbb2',               // Primary text - Warm cream (not pure white)
    luxDim: '#d5c4a1',            // Secondary text - Muted cream
    clay: '#928374',              // Meta/Label - Warm grey-brown
    
    // VIBRANT GOLD - The star of the theme (unchanged from input.css)
    // This is the "jewel" that glows on the warm background
    gold: '#eab308',              // Vibrant gold (Amber-500) - THE PRIMARY COLOR
    primary: '#eab308',           // Maps to --color-primary
    primaryForeground: '#1d2021',  // Dark text on gold (warm stone)
    
    // Secondary & Accent - Warm neutrals
    secondary: '#3c3836',         // Medium warm grey
    secondaryForeground: '#ebdbb2', // Warm cream text
    accent: '#3c3836',            // Medium warm grey
    accentForeground: '#ebdbb2',  // Warm cream text
    
    // Status Colors - Warm, muted versions that complement gold
    success: '#98971a',           // Warm olive green (complements gold)
    successForeground: '#ebdbb2', // Warm cream text
    warning: '#d79921',            // Warm amber (slightly muted, complements gold)
    warningForeground: '#1d2021', // Dark text
    error: '#cc241d',              // Warm red (muted, not harsh)
    errorForeground: '#ebdbb2',   // Warm cream text
    info: '#458588',               // Warm teal (complements gold)
    infoForeground: '#ebdbb2',    // Warm cream text
    
    // Strokes - Warm, subtle borders
    stroke: '#504945',            // Warm grey borders
    strokeStrong: '#665c54',      // Stronger warm grey
    strokeSoft: '#3c3836',        // Soft warm grey
    
    // Semantic Mappings
    background: '#1d2021',        // Warm dark stone
    foreground: '#ebdbb2',       // Warm cream text
    muted: '#3c3836',            // Medium warm grey
    mutedForeground: '#928374',  // Warm grey-brown
    card: '#282828',             // Rich charcoal
    cardForeground: '#ebdbb2',   // Warm cream
    popover: '#282828',          // Rich charcoal
    popoverForeground: '#ebdbb2', // Warm cream
    border: '#504945',           // Warm grey
    input: '#504945',            // Warm grey
    destructive: '#cc241d',      // Warm red
    destructiveForeground: '#ebdbb2', // Warm cream
    ring: '#eab308',             // VIBRANT GOLD focus ring - glows!
    
    // Sidebar Colors
    sidebarBackground: '#1d2021',  // Warm dark stone
    sidebarForeground: '#d5c4a1',  // Muted cream
    sidebarPrimary: '#ebdbb2',     // Warm cream
    sidebarPrimaryForeground: '#1d2021', // Dark text
    sidebarAccent: '#3c3836',      // Medium warm grey
    sidebarAccentForeground: '#ebdbb2', // Warm cream
    sidebarBorder: '#504945',      // Warm grey
    sidebarRing: '#eab308',        // VIBRANT GOLD sidebar ring
  },
  cssVariables: {
    // Gold glow effects - makes gold "glow" instead of "scream"
    '--shadow-glow-gold': '0 0 0 1px rgba(234, 179, 8, 0.3), 0 8px 24px rgba(234, 179, 8, 0.15)',
    '--shadow-glow-gold-subtle': '0 0 0 1px rgba(234, 179, 8, 0.2), 0 4px 12px rgba(234, 179, 8, 0.1)',
    
    // Warm gradient (subtle)
    '--gradient-gold-glow': 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(217, 153, 33, 0.06))',
    
    // Smooth, luxurious transitions
    '--transition-glow': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

