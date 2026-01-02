/**
 * AIBOS Design System - shadcn/ui Component Mapping Types
 * 
 * TypeScript definitions for IDE consumption of shadcn/ui to AIBOS class mappings
 * Provides full IntelliSense and type safety for component mappings
 */

/**
 * AIBOS classes mapping for a shadcn component
 */
export interface AIBOSClassesMapping {
  /** Base class to use for the component */
  base: string;
  /** All applicable AIBOS classes */
  all: string[];
  /** Semantic classes (non-utility) */
  semantic: string[];
  /** Utility classes (spacing, layout, etc.) */
  utilities: string[];
  /** Total count of mapped classes */
  count: number;
}

/**
 * Component part mapping (e.g., CardHeader, CardTitle)
 */
export interface ComponentPartMapping {
  [partName: string]: string[];
}

/**
 * Individual shadcn component mapping
 */
export interface ShadcnComponentMapping {
  /** shadcn component name */
  shadcn: string;
  /** Human-readable description */
  description: string;
  /** Component parts mapping */
  parts: ComponentPartMapping;
  /** AIBOS classes mapping */
  aibosClasses: AIBOSClassesMapping;
  /** Usage examples */
  examples: string[];
  /** Quick example code snippet */
  example?: string;
  /** Usage instructions */
  usage?: string;
  /** IDE-friendly IntelliSense description */
  intellisense?: {
    /** Short description for autocomplete */
    summary: string;
    /** Detailed description for hover */
    details: string;
    /** Recommended classes for this component */
    recommended: string[];
    /** Common patterns */
    patterns: string[];
  };
}

/**
 * Reverse mapping: AIBOS class → shadcn components
 */
export interface AIBOSToShadcnMapping {
  [aibosClass: string]: string[];
}

/**
 * Component parts registry
 */
export interface ComponentPartsRegistry {
  [componentName: string]: string[];
}

/**
 * Integration guidance
 */
export interface IntegrationGuide {
  quickStart: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  bestPractices: string[];
  /** IDE-specific integration tips */
  ideIntegration?: {
    vsCode?: string[];
    webstorm?: string[];
    typescript?: string[];
  };
}

/**
 * Mapping statistics
 */
export interface ShadcnMapStats {
  /** Total AIBOS classes available */
  totalAIBOSClasses: number;
  /** Total shadcn components mapped */
  totalShadcnComponents: number;
  /** Total mappings generated */
  totalMappings: number;
  /** Total component parts mapped */
  totalComponentParts: number;
  /** Coverage percentage */
  coverage: string;
}

/**
 * Design system metadata
 */
export interface DesignSystemMetadata {
  name: string;
  version: string;
  description: string;
}

/**
 * Complete shadcn mapping structure
 */
export interface ShadcnMap {
  /** Schema version */
  version: string;
  /** Generation timestamp */
  generated: string;
  /** Design system metadata */
  designSystem: DesignSystemMetadata;
  /** Mapping statistics */
  stats: ShadcnMapStats;
  /** Component mappings */
  mappings: {
    [componentName: string]: ShadcnComponentMapping;
  };
  /** Reverse mapping: AIBOS → shadcn */
  aibosToShadcn: AIBOSToShadcnMapping;
  /** Component parts registry */
  componentParts: ComponentPartsRegistry;
  /** Integration guidance */
  integration: IntegrationGuide;
}

/**
 * Helper type for accessing component mappings
 */
export type ShadcnComponentName = keyof ShadcnMap['mappings'];

/**
 * Helper type for getting AIBOS classes for a component
 */
export type AIBOSClassesForComponent<T extends ShadcnComponentName> = 
  ShadcnMap['mappings'][T]['aibosClasses'];

/**
 * Helper type for getting component parts
 */
export type ComponentPartsForComponent<T extends ShadcnComponentName> = 
  ShadcnMap['mappings'][T]['parts'];

