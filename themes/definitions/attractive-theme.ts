/**
 * AIBOS Attractive Theme
 * 
 * Premium theme with 5 core attractive colors:
 * 1. Deep Ocean Blue (Primary)
 * 2. Vibrant Coral (Accent)
 * 3. Rich Emerald (Success)
 * 4. Warm Amber (Warning)
 * 5. Elegant Slate (Neutral)
 * 
 * Designed for modern, premium applications
 */

import type { CustomTheme } from './theme-machine';

export const attractiveTheme: CustomTheme = {
  name: 'attractive',
  tokens: {
    // Core 5 Colors - Premium Palette
    void: '#0f172a',              // Deep Ocean Blue - Main Background (Slate-900)
    paper: '#1e293b',             // Rich Slate - Panel Background (Slate-800)
    paper2: '#334155',            // Medium Slate - Hover/Input (Slate-700)
    paperHover: '#475569',        // Light Slate - Hover state (Slate-600)
    white: '#ffffff',             // Pure white
    lux: '#f1f5f9',               // Light Slate - Primary Text (Slate-100)
    luxDim: '#cbd5e1',            // Medium Light - Secondary Text (Slate-300)
    clay: '#94a3b8',              // Medium Gray - Meta/Label (Slate-400)
    
    // Color 1: Deep Ocean Blue (Primary)
    gold: '#3b82f6',              // Vibrant Blue - Primary Actions (Blue-500)
    primary: '#3b82f6',           // Maps to --color-primary
    primaryForeground: '#ffffff', // White text on blue
    
    // Color 2: Vibrant Coral (Accent)
    accent: '#f97316',            // Vibrant Coral - Accent (Orange-500)
    accentForeground: '#ffffff',  // White text on coral
    
    // Color 3: Rich Emerald (Success)
    success: '#10b981',          // Rich Emerald - Success (Emerald-500)
    
    // Color 4: Warm Amber (Warning)
    warning: '#f59e0b',           // Warm Amber - Warning (Amber-500)
    
    // Color 5: Elegant Slate (Neutral/Secondary)
    secondary: '#475569',        // Elegant Slate - Secondary (Slate-600)
    secondaryForeground: '#f1f5f9', // Light text on slate
    
    // Error (using vibrant red)
    error: '#ef4444',            // Vibrant Red - Error (Red-500)
    info: '#06b6d4',             // Cyan - Info (Cyan-500)
    
    // Strokes
    stroke: '#334155',           // Slate-700 borders
    strokeStrong: '#475569',     // Slate-600 hover borders
    strokeSoft: '#1e293b',       // Slate-800 soft borders
    
    // Semantic Mappings (Figma Standard)
    background: '#0f172a',       // Deep Ocean Blue
    foreground: '#f1f5f9',       // Light Slate text
    muted: '#334155',            // Medium Slate
    mutedForeground: '#94a3b8',  // Medium Gray
    card: '#1e293b',             // Rich Slate
    cardForeground: '#f1f5f9',   // Light text
    popover: '#1e293b',          // Rich Slate
    popoverForeground: '#f1f5f9', // Light text
    border: '#334155',           // Slate-700
    input: '#334155',            // Slate-700
    destructive: '#ef4444',      // Vibrant Red
    destructiveForeground: '#ffffff', // White text
    ring: '#3b82f6',             // Vibrant Blue focus ring
    
    // Sidebar Colors
    sidebarBackground: '#0f172a',
    sidebarForeground: '#cbd5e1',
    sidebarPrimary: '#f1f5f9',
    sidebarPrimaryForeground: '#0f172a',
    sidebarAccent: '#334155',
    sidebarAccentForeground: '#f1f5f9',
    sidebarBorder: '#334155',
    sidebarRing: '#3b82f6',
  },
  cssVariables: {
    // Additional premium effects
    '--shadow-glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
    '--shadow-glow-coral': '0 0 20px rgba(249, 115, 22, 0.3)',
  },
};

