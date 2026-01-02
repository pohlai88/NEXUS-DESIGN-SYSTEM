/**
 * AIBOS Design System - Component Specification Types
 * 
 * TypeScript types for component specifications
 * Generated from component-spec.schema.json
 */

export type RadixPrimitive =
    | '@radix-ui/react-dialog'
    | '@radix-ui/react-dropdown-menu'
    | '@radix-ui/react-popover'
    | '@radix-ui/react-select'
    | '@radix-ui/react-checkbox'
    | '@radix-ui/react-radio-group'
    | '@radix-ui/react-switch'
    | '@radix-ui/react-slider'
    | '@radix-ui/react-tabs'
    | '@radix-ui/react-accordion'
    | '@radix-ui/react-alert-dialog'
    | '@radix-ui/react-toast'
    | '@radix-ui/react-tooltip'
    | '@radix-ui/react-separator'
    | '@radix-ui/react-label'
    | null;

export type NativeElement =
    | 'button'
    | 'input'
    | 'div'
    | 'label'
    | 'select'
    | 'textarea'
    | null;

export type ComponentCategory =
    | 'interactive'
    | 'layout'
    | 'form'
    | 'feedback'
    | 'navigation'
    | 'data-display';

export type ComponentComplexity = 'simple' | 'moderate' | 'complex';

export type AccessibilityHandler = 'radix-ui' | 'native' | 'custom';

export interface ComponentProp {
    type: string;
    default?: unknown;
    required?: boolean;
    description?: string;
}

export interface ComponentVariant {
    aibosClasses: string[];
    description?: string;
}

export interface ComponentState {
    aibosClasses?: string[];
    css?: string;
    description?: string;
}

export interface ComponentPart {
    radixComponent?: string;
    aibosClasses: string[];
    description?: string;
}

export interface AccessibilitySpec {
    handledBy: AccessibilityHandler;
    aria?: Record<string, string>;
    keyboard?: Record<string, string>;
    features?: string[];
}

export interface ComponentMetadata {
    category?: ComponentCategory;
    tags?: string[];
    related?: string[];
    complexity?: ComponentComplexity;
}

export interface ComponentSpec {
    name: string;
    description?: string;
    radixPrimitive: RadixPrimitive;
    nativeElement?: NativeElement;
    props?: Record<string, ComponentProp>;
    variants: Record<string, ComponentVariant>;
    states?: Record<string, ComponentState>;
    parts?: Record<string, ComponentPart>;
    accessibility?: AccessibilitySpec;
    metadata?: ComponentMetadata;
}

export interface ComponentSpecification {
    version: string;
    components: Record<string, ComponentSpec>;
}

