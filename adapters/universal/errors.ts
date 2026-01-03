/**
 * Universal Adapter Error Classes
 * 
 * Structured error handling for adapter operations
 */

import { z } from 'zod';
import type { ComponentSpec } from '../../types/component-spec.js';
import { validateSpecWithZod, formatValidationError } from './validation.js';

/**
 * Base error class for adapter operations
 */
export class AdapterError extends Error {
    constructor(
        public component: string,
        public reason: string,
        public spec?: ComponentSpec
    ) {
        super(`Adapter Error: Failed to generate ${component} - ${reason}`);
        this.name = 'AdapterError';
    }
}

/**
 * Error for invalid component specifications
 */
export class InvalidSpecError extends AdapterError {
    constructor(component: string, reason: string, spec?: ComponentSpec) {
        super(component, `Invalid specification: ${reason}`, spec);
        this.name = 'InvalidSpecError';
    }
}

/**
 * Error for missing required dependencies
 */
export class MissingDependencyError extends AdapterError {
    constructor(component: string, dependency: string) {
        super(component, `Missing required dependency: ${dependency}`);
        this.name = 'MissingDependencyError';
    }
}

/**
 * Error for framework not supported
 */
export class UnsupportedFrameworkError extends AdapterError {
    constructor(framework: string) {
        super('Unknown', `Framework "${framework}" is not supported`);
        this.name = 'UnsupportedFrameworkError';
    }
}

/**
 * Validate component specification using Zod
 * 
 * @param spec - Component specification to validate
 * @throws {InvalidSpecError} If validation fails
 */
export function validateSpec(spec: unknown): ComponentSpec {
    try {
        return validateSpecWithZod(spec);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const componentName = (spec as ComponentSpec)?.name || 'Unknown';
            const formattedError = formatValidationError(error);
            throw new InvalidSpecError(componentName, formattedError, spec as ComponentSpec);
        }
        throw error;
    }
}

/**
 * Legacy validation function (kept for backward compatibility)
 * Now uses Zod internally
 */
export function validateSpecLegacy(spec: ComponentSpec): void {
    validateSpec(spec);
}

