/**
 * Gruvbox Material Theme
 * 
 * Inspired by sainnhe/gruvbox-material - the classic choice for making
 * gold colors look sophisticated and stable.
 * 
 * Uses a "warm, deep stone" background that makes yellow/gold text look incredible.
 * Designed around gold, orange, and yellow accents. Feels retro, warm, and expensive.
 * 
 * This is the "Medium" contrast version - not black, but a rich, dark sepia/grey.
 * Perfect for making vibrant gold #eab308 glow beautifully.
 */

import type { CustomTheme } from './theme-machine';

export const gruvboxMaterialTheme: CustomTheme = {
  name: 'gruvbox-material',
  tokens: {
    // Base Palette - Warm, Deep Stone (Medium Contrast)
    // Rich, dark sepia/grey - not pure black
    void: '#292828',              // Base - Warm dark stone (Medium contrast)
    paper: '#32302f',             // Surface - Rich sepia-grey
    paper2: '#3c3836',             // Panel - Medium warm grey
    paperHover: '#504945',         // Hover - Lighter warm grey
    white: '#ffffff',             // Pure white
    lux: '#ebdbb2',               // Primary text - Warm cream
    luxDim: '#d5c4a1',            // Secondary text - Muted cream
    clay: '#a89984',              // Meta/Label - Warm grey
    
    // GOLD - Vibrant but stable on warm background
    gold: '#eab308',              // Your vibrant gold (works perfectly here!)
    primary: '#eab308',           // Maps to --color-primary
    primaryForeground: '#292828',  // Dark text on gold
    
    // Accent - Warm Orange (complements gold)
    accent: '#fe8019',            // Warm orange - complements gold beautifully
    accentForeground: '#292828',   // Dark text
    
    // Secondary - Warm neutrals
    secondary: '#3c3836',         // Medium warm grey
    secondaryForeground: '#ebdbb2', // Warm cream text
    
    // Status Colors - Gruvbox Material palette
    success: '#98971a',           // Warm olive green
    successForeground: '#ebdbb2', // Warm cream
    warning: '#d79921',           // Warm amber (complements gold)
    warningForeground: '#292828', // Dark text
    error: '#cc241d',             // Warm red (muted)
    errorForeground: '#ebdbb2',   // Warm cream
    info: '#458588',              // Warm teal
    infoForeground: '#ebdbb2',    // Warm cream
    
    // Strokes - Warm borders
    stroke: '#504945',            // Warm grey borders
    strokeStrong: '#665c54',      // Stronger warm grey
    strokeSoft: '#3c3836',        // Soft warm grey
    
    // Semantic Mappings
    background: '#292828',        // Warm dark stone
    foreground: '#ebdbb2',       // Warm cream text
    muted: '#3c3836',            // Medium warm grey
    mutedForeground: '#a89984',  // Warm grey
    card: '#32302f',             // Rich sepia
    cardForeground: '#ebdbb2',   // Warm cream
    popover: '#32302f',          // Rich sepia
    popoverForeground: '#ebdbb2', // Warm cream
    border: '#504945',           // Warm grey
    input: '#504945',            // Warm grey
    destructive: '#cc241d',      // Warm red
    destructiveForeground: '#ebdbb2', // Warm cream
    ring: '#eab308',             // GOLD focus ring - glows!
    
    // Sidebar Colors
    sidebarBackground: '#292828',  // Warm dark stone
    sidebarForeground: '#d5c4a1',  // Muted cream
    sidebarPrimary: '#ebdbb2',     // Warm cream
    sidebarPrimaryForeground: '#292828', // Dark text
    sidebarAccent: '#3c3836',      // Medium warm grey
    sidebarAccentForeground: '#ebdbb2', // Warm cream
    sidebarBorder: '#504945',      // Warm grey
    sidebarRing: '#eab308',        // GOLD sidebar ring
  },
  cssVariables: {
    // Gold glow effects
    '--shadow-glow-gold': '0 0 0 1px rgba(234, 179, 8, 0.3), 0 8px 24px rgba(234, 179, 8, 0.15)',
    '--shadow-glow-orange': '0 0 0 1px rgba(254, 128, 25, 0.25), 0 4px 12px rgba(254, 128, 25, 0.1)',
    
    // Warm gradient
    '--gradient-gruvbox': 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(254, 128, 25, 0.06))',
    
    // Smooth transitions
    '--transition-gruvbox': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

