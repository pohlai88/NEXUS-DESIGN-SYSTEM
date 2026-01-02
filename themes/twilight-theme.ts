/**
 * AIBOS Twilight Theme
 * 
 * A sophisticated mid-tone theme that elegantly balances between light and dark.
 * Inspired by GitHub Dimmed, Solarized, and Nord themes.
 * 
 * Key Characteristics:
 * - Mid-tone backgrounds (not too bright, not too dark)
 * - Reduced saturation for stability and reduced eye strain
 * - Cool, sophisticated color palette
 * - Fascinating accent colors that maintain professionalism
 * - Perfect for extended use and long coding sessions
 * 
 * Color Philosophy:
 * - Base: Sophisticated gray-blue (mid-tone)
 * - Primary: Elegant Teal (sophisticated, calming)
 * - Accent: Muted Violet (fascinating, unique)
 * - Success: Soft Sage Green (natural, calming)
 * - Warning: Warm Terracotta (warm but muted)
 * - Secondary: Neutral Charcoal (stable, versatile)
 */

import type { CustomTheme } from './theme-machine';

export const twilightTheme: CustomTheme = {
  name: 'twilight',
  tokens: {
    // Base Palette - Mid-tone Gray-Blue (Between Light & Dark)
    // Inspired by GitHub Dimmed and Solarized
    void: '#1c1e26',              // Deep Charcoal-Blue - Main Background (mid-tone)
    paper: '#232530',             // Rich Charcoal - Panel Background (slightly lighter)
    paper2: '#2e3440',           // Medium Charcoal - Hover/Input (Nord-inspired)
    paperHover: '#3b4252',        // Light Charcoal - Hover state
    white: '#ffffff',             // Pure white for contrast
    lux: '#d8dee9',              // Soft Ice Blue - Primary Text (Nord Snow-2)
    luxDim: '#a5abb6',           // Muted Blue-Gray - Secondary Text
    clay: '#818896',              // Medium Gray-Blue - Meta/Label
    
    // Primary Color - Elegant Teal (Sophisticated & Calming)
    gold: '#5e81ac',             // Nord Blue-3 - Elegant Teal-Blue
    primary: '#5e81ac',           // Maps to --color-primary
    primaryForeground: '#eceff4', // Soft white for contrast
    
    // Accent Color - Muted Violet (Fascinating & Unique)
    accent: '#b48ead',            // Nord Purple - Muted Violet
    accentForeground: '#eceff4',  // Soft white
    
    // Success - Soft Sage Green (Natural & Calming)
    success: '#a3be8c',          // Nord Green - Soft Sage
    successForeground: '#2e3440', // Dark text on light green
    
    // Warning - Warm Terracotta (Warm but Muted)
    warning: '#d08770',           // Nord Orange - Warm Terracotta
    warningForeground: '#2e3440', // Dark text
    
    // Secondary - Neutral Charcoal (Stable & Versatile)
    secondary: '#4c566a',         // Nord Gray-5 - Neutral Charcoal
    secondaryForeground: '#eceff4', // Light text
    
    // Error - Soft Red (Not too aggressive)
    error: '#bf616a',             // Nord Red - Soft Red (less aggressive)
    errorForeground: '#eceff4',   // Light text
    
    // Info - Cool Cyan (Calming)
    info: '#88c0d0',              // Nord Cyan - Cool Cyan
    infoForeground: '#2e3440',    // Dark text
    
    // Strokes - Subtle borders
    stroke: '#3b4252',            // Light Charcoal borders
    strokeStrong: '#4c566a',      // Medium Charcoal hover borders
    strokeSoft: '#2e3440',        // Soft borders
    
    // Semantic Mappings (Figma Standard)
    background: '#1c1e26',        // Deep Charcoal-Blue
    foreground: '#d8dee9',        // Soft Ice Blue text
    muted: '#2e3440',            // Medium Charcoal
    mutedForeground: '#818896',  // Medium Gray-Blue
    card: '#232530',             // Rich Charcoal
    cardForeground: '#d8dee9',   // Soft Ice Blue
    popover: '#232530',          // Rich Charcoal
    popoverForeground: '#d8dee9', // Soft Ice Blue
    border: '#3b4252',           // Light Charcoal
    input: '#3b4252',            // Light Charcoal
    destructive: '#bf616a',      // Soft Red
    destructiveForeground: '#eceff4', // Light text
    ring: '#5e81ac',             // Elegant Teal focus ring
    
    // Sidebar Colors
    sidebarBackground: '#1c1e26',
    sidebarForeground: '#a5abb6',
    sidebarPrimary: '#d8dee9',
    sidebarPrimaryForeground: '#1c1e26',
    sidebarAccent: '#2e3440',
    sidebarAccentForeground: '#d8dee9',
    sidebarBorder: '#3b4252',
    sidebarRing: '#5e81ac',
  },
  cssVariables: {
    // Subtle glow effects for sophistication
    '--shadow-glow-teal': '0 0 15px rgba(94, 129, 172, 0.2)',
    '--shadow-glow-violet': '0 0 15px rgba(180, 142, 173, 0.15)',
    // Soft transitions
    '--transition-smooth': 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

