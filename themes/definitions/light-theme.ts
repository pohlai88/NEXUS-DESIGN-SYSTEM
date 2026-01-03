/**
 * AIBOS Light Theme
 * 
 * Light theme variant for Neo-Analog Design System
 * Provides high contrast, comfortable reading experience
 */

import type { CustomTheme } from './theme-machine';

export const lightTheme: CustomTheme = {
  name: 'light',
  tokens: {
    // Color Primitives - Light Theme Palette
    void: '#ffffff',              // Main Background (White)
    paper: '#f8f9fa',            // Panel Background (Light Gray)
    paper2: '#e9ecef',           // Hover / Input (Lighter Gray)
    paperHover: '#dee2e6',       // Hover state
    white: '#ffffff',            // Pure white
    lux: '#212529',              // Primary Text (Dark)
    luxDim: '#495057',           // Secondary Text (Medium Gray)
    clay: '#6c757d',             // Meta / Label (Gray)
    gold: '#d97706',             // Accent (Amber-600 for better contrast on light)
    stroke: '#dee2e6',           // Panel Borders (Light Gray)
    strokeStrong: '#ced4da',     // Hover Borders (Medium Gray)
    strokeSoft: '#f1f3f5',       // Soft borders
    
    // Semantic Status Colors (slightly adjusted for light theme)
    success: '#059669',          // Emerald-600 (darker for contrast)
    warning: '#d97706',          // Amber-600
    error: '#dc2626',            // Red-600 (darker for contrast)
    info: '#0284c7',             // Sky-600 (darker for contrast)
    
    // Semantic Mappings (Figma Standard)
    background: '#ffffff',        // Maps to --color-background
    foreground: '#212529',        // Maps to --color-foreground
    muted: '#e9ecef',            // Maps to --color-muted
    mutedForeground: '#6c757d',  // Maps to --color-muted-foreground
    card: '#f8f9fa',             // Maps to --color-card
    cardForeground: '#212529',   // Maps to --color-card-foreground
    popover: '#f8f9fa',          // Maps to --color-popover
    popoverForeground: '#212529', // Maps to --color-popover-foreground
    border: '#dee2e6',           // Maps to --color-border
    input: '#dee2e6',            // Maps to --color-input
    primary: '#d97706',          // Maps to --color-primary (also ShadCN)
    primaryForeground: '#ffffff', // Maps to --color-primary-foreground (also ShadCN)
    secondary: '#e9ecef',        // Maps to --color-secondary
    secondaryForeground: '#212529', // Maps to --color-secondary-foreground
    accent: '#e9ecef',           // Maps to --color-accent
    accentForeground: '#212529', // Maps to --color-accent-foreground
    destructive: '#dc2626',      // Maps to --color-destructive
    destructiveForeground: '#ffffff', // Maps to --color-destructive-foreground
    ring: '#d97706',             // Maps to --color-ring
    
    // Sidebar Colors (if used)
    sidebarBackground: '#ffffff',
    sidebarForeground: '#495057',
    sidebarPrimary: '#212529',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#e9ecef',
    sidebarAccentForeground: '#212529',
    sidebarBorder: '#dee2e6',
    sidebarRing: '#d97706',
  },
  cssVariables: {
    // Additional custom CSS variables if needed
    // These are applied directly without mapping
  },
};

