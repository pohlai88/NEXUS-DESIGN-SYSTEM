/**
 * Component Specification Validation
 * 
 * Zod-based validation for ComponentSpec with better error messages
 */

import { z } from 'zod';
import type { ComponentSpec } from '../../types/component-spec.js';

/**
 * Reserved JavaScript/TypeScript keywords that cannot be used as component names
 */
const RESERVED_KEYWORDS = new Set([
  'var', 'let', 'const', 'function', 'class', 'interface', 'type',
  'enum', 'namespace', 'module', 'import', 'export', 'default',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case',
  'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new',
  'this', 'super', 'extends', 'implements', 'static', 'async', 'await',
  'void', 'null', 'undefined', 'true', 'false', 'NaN', 'Infinity',
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Symbol', 'BigInt',
  'Promise', 'React', 'Component', 'Props', 'State', 'Ref', 'Element',
]);

/**
 * Radix UI primitive schema
 */
const radixPrimitiveSchema = z.union([
  z.literal('@radix-ui/react-dialog'),
  z.literal('@radix-ui/react-dropdown-menu'),
  z.literal('@radix-ui/react-popover'),
  z.literal('@radix-ui/react-select'),
  z.literal('@radix-ui/react-checkbox'),
  z.literal('@radix-ui/react-radio-group'),
  z.literal('@radix-ui/react-switch'),
  z.literal('@radix-ui/react-slider'),
  z.literal('@radix-ui/react-tabs'),
  z.literal('@radix-ui/react-accordion'),
  z.literal('@radix-ui/react-alert-dialog'),
  z.literal('@radix-ui/react-toast'),
  z.literal('@radix-ui/react-tooltip'),
  z.literal('@radix-ui/react-separator'),
  z.literal('@radix-ui/react-label'),
  z.null(),
]);

/**
 * Native element schema
 */
const nativeElementSchema = z.union([
  z.literal('button'),
  z.literal('input'),
  z.literal('div'),
  z.literal('label'),
  z.literal('select'),
  z.literal('textarea'),
  z.literal('details'),
  z.literal('summary'),
  z.literal('a'),
  z.literal('span'),
  z.literal('table'),
  z.literal('thead'),
  z.literal('tbody'),
  z.literal('tr'),
  z.literal('th'),
  z.literal('td'),
  z.null(),
]);

/**
 * Component prop schema
 */
const componentPropSchema = z.object({
  type: z.string().min(1, 'Prop type cannot be empty'),
  default: z.unknown().optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
});

/**
 * Component variant schema
 */
const componentVariantSchema = z.object({
  aibosClasses: z.array(z.string()).min(1, 'Variant must have at least one class'),
  description: z.string().optional(),
});

/**
 * Component state schema
 */
const componentStateSchema = z.object({
  aibosClasses: z.array(z.string()).optional(),
  css: z.string().optional(),
  description: z.string().optional(),
});

/**
 * Component part schema
 */
const componentPartSchema = z.object({
  radixComponent: z.string().optional(),
  aibosClasses: z.array(z.string()).min(1, 'Part must have at least one class'),
  description: z.string().optional(),
});

/**
 * Component specification schema
 */
export const componentSpecSchema = z.object({
  name: z
    .string()
    .min(1, 'Component name is required')
    .refine(
      (name) => !RESERVED_KEYWORDS.has(name.toLowerCase()),
      (name) => ({
        message: `Component name "${name}" is a reserved keyword and cannot be used`,
      })
    )
    .refine(
      (name) => /^[A-Z][a-zA-Z0-9]*$/.test(name),
      (name) => ({
        message: `Component name "${name}" must be PascalCase (start with uppercase letter, alphanumeric only)`,
      })
    ),
  description: z.string().optional(),
  radixPrimitive: radixPrimitiveSchema,
  nativeElement: nativeElementSchema.optional(),
  props: z.record(z.string(), componentPropSchema).optional(),
  variants: z
    .record(z.string(), componentVariantSchema)
    .refine((val) => Object.keys(val).length >= 1, {
      message: 'Component must have at least one variant',
    }),
  states: z.record(z.string(), componentStateSchema).optional(),
  parts: z.record(z.string(), componentPartSchema).optional(),
  accessibility: z
    .object({
      handledBy: z.enum(['radix-ui', 'native', 'custom']),
      aria: z.record(z.string(), z.string()).optional(),
      keyboard: z.record(z.string(), z.string()).optional(),
      features: z.array(z.string()).optional(),
    })
    .optional(),
  metadata: z
    .object({
      category: z
        .enum(['interactive', 'layout', 'form', 'feedback', 'navigation', 'data-display'])
        .optional(),
      tags: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
      complexity: z.enum(['simple', 'moderate', 'complex']).optional(),
    })
    .optional(),
});

/**
 * Validate component specification with Zod
 * 
 * @param spec - Component specification to validate
 * @throws {z.ZodError} If validation fails
 */
export function validateSpecWithZod(spec: unknown): ComponentSpec {
  return componentSpecSchema.parse(spec) as ComponentSpec;
}

/**
 * Validate component specification with detailed error messages
 * 
 * @param spec - Component specification to validate
 * @returns Validated ComponentSpec
 * @throws {z.ZodError} If validation fails with formatted error messages
 */
export function validateSpecSafe(spec: unknown): {
  success: true;
  data: ComponentSpec;
} | {
  success: false;
  error: z.ZodError;
} {
  const result = componentSpecSchema.safeParse(spec);

  if (result.success) {
    return { success: true, data: result.data as ComponentSpec };
  }

  return { success: false, error: result.error };
}

/**
 * Format Zod error for display
 */
export function formatValidationError(error: z.ZodError): string {
  return error.errors
    .map((err) => {
      const path = err.path.join('.');
      return path ? `${path}: ${err.message}` : err.message;
    })
    .join('\n');
}

/**
 * Check if component name is reserved
 */
export function isReservedKeyword(name: string): boolean {
  return RESERVED_KEYWORDS.has(name.toLowerCase());
}

/**
 * Validate component name format
 */
export function isValidComponentName(name: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
}

