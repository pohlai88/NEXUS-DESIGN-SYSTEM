# Storybook CLI and Consistency Tools
## AIBOS Design System

**Date**: 2026-01-03  
**Status**: 📋 **RESEARCH COMPLETE** - Recommendations provided  
**Goal**: Ensure consistent Storybook story creation across all components

---

## Executive Summary

Found several tools and best practices for ensuring consistent Storybook setup:

1. **storybook-genie** - CLI tool for generating stories (110 stars)
2. **story-ui** - AI-powered Storybook generator
3. **Custom CLI Script** - Recommended for our Web Components

**Recommendation**: Create a custom CLI script tailored to our Web Components architecture.

---

## Tools Found

### 1. storybook-genie ⭐ **RECOMMENDED FOR REFERENCE**

**Repository**: [eduardconstantin/storybook-genie](https://github.com/eduardconstantin/storybook-genie)  
**Stars**: 110  
**Language**: JavaScript  
**Status**: Active

**Features**:
- Generates Storybook stories from React components
- Uses OpenAI/Ollama for AI-powered generation
- CLI-based tool
- Supports multiple story variants

**Limitations**:
- Designed for React components
- May need adaptation for Web Components
- Requires API key for AI features

**Use Case**: Reference for CLI structure and best practices

---

### 2. story-ui (AI-Powered)

**Repository**: [southleft/story-ui](https://github.com/southleft/story-ui)  
**Description**: AI-Powered Storybook Story Generator

**Features**:
- AI-powered story generation
- Automated story creation
- Template-based approach

**Status**: Active development

**Use Case**: Reference for AI integration patterns

---

### 3. Component Generators with Storybook Support

Found several component generators that include Storybook:
- `create-react-component` - Includes Storybook templates
- `compogen` - React component generator with Storybook
- Various scaffolding tools

**Use Case**: Reference for template patterns

---

## Recommended Solution: Custom CLI Script

Based on the research, **creating a custom CLI script** is the best approach for our Web Components because:

1. ✅ **Tailored to Web Components** - Not React-specific
2. ✅ **Uses our existing patterns** - Follows `button.stories.ts` template
3. ✅ **No external dependencies** - Works with our monorepo setup
4. ✅ **Consistent structure** - Enforces our conventions
5. ✅ **Type-safe** - Uses TypeScript

---

## Implementation Plan

### Step 1: Create Story Generator CLI Script

**File**: `scripts/generate-story.ts`

**Features**:
- Generate story file from component name
- Use `button.stories.ts` as template
- Auto-detect component attributes from dist files
- Generate argTypes from component spec
- Create multiple story variants

**Usage**:
```bash
pnpm generate:story input
# Creates: components/html/examples/input.stories.ts
```

---

### Step 2: Create Story Template

**File**: `scripts/templates/story.template.ts`

**Template Structure**:
```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Web Components/{{ComponentName}}',
  component: '{{component-tag}}',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '{{description}}',
      },
    },
  },
  argTypes: {
    // Auto-generated from component spec
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`...`,
  args: { ... },
};
```

---

### Step 3: Integration with Component Generator

**Enhancement**: Add story generation to existing component generator

**File**: `scripts/generate-adapter.ts` (enhance existing)

**Add**:
- Option to generate story file
- Auto-create story when component is generated
- Link story to component spec

---

## Best Practices from Research

### 1. Consistent Story Structure ✅

**From storybook-genie**:
- Always include `Default` story
- Use `autodocs` tag
- Include component description
- Generate argTypes from component props

**Our Implementation**:
```typescript
const meta: Meta = {
  title: 'Web Components/Button', // Consistent naming
  component: 'na-button',          // Consistent tag format
  tags: ['autodocs'],              // Always include
  // ...
};
```

---

### 2. Story Variants ✅

**Best Practice**: Create multiple story variants for each component

**Standard Variants**:
- `Default` - Basic usage
- `Variants` - All variants (if applicable)
- `Sizes` - All sizes (if applicable)
- `States` - Disabled, loading, error (if applicable)
- `Examples` - Real-world usage examples

**Our Pattern** (from `button.stories.ts`):
```typescript
export const Default: Story = { ... };
export const Primary: Story = { ... };
export const Secondary: Story = { ... };
export const Sizes: Story = { ... };
export const Disabled: Story = { ... };
export const Loading: Story = { ... };
```

---

### 3. Auto-Generated argTypes ✅

**Best Practice**: Generate argTypes from component spec

**Implementation**:
- Read component spec file
- Extract props/attributes
- Generate argTypes with controls
- Add descriptions from spec

---

### 4. Template-Based Generation ✅

**Best Practice**: Use templates for consistency

**Our Approach**:
- Template file: `scripts/templates/story.template.ts`
- Variable substitution: `{{ComponentName}}`, `{{component-tag}}`
- Consistent structure across all stories

---

## CLI Script Implementation

### Basic Structure

```typescript
// scripts/generate-story.ts
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface StoryConfig {
  componentName: string;
  componentTag: string;
  description: string;
  attributes: Array<{
    name: string;
    type: string;
    options?: string[];
    description?: string;
  }>;
}

function generateStory(config: StoryConfig): string {
  // Read template
  const template = readFileSync(
    join(__dirname, 'templates/story.template.ts'),
    'utf-8'
  );
  
  // Replace variables
  let story = template
    .replace(/{{ComponentName}}/g, config.componentName)
    .replace(/{{component-tag}}/g, config.componentTag)
    .replace(/{{description}}/g, config.description);
  
  // Generate argTypes
  const argTypes = generateArgTypes(config.attributes);
  story = story.replace(/{{argTypes}}/g, argTypes);
  
  return story;
}

function generateArgTypes(attributes: StoryConfig['attributes']): string {
  return attributes.map(attr => {
    let control = 'text';
    if (attr.options) {
      control = `select`;
      return `    ${attr.name}: {
      control: '${control}',
      options: ${JSON.stringify(attr.options)},
      description: '${attr.description || ''}',
    },`;
    }
    if (attr.type === 'boolean') {
      control = 'boolean';
    }
    return `    ${attr.name}: {
      control: '${control}',
      description: '${attr.description || ''}',
    },`;
  }).join('\n');
}
```

---

## Package.json Script

Add to `package.json`:

```json
{
  "scripts": {
    "generate:story": "tsx scripts/generate-story.ts",
    "generate:stories": "tsx scripts/generate-all-stories.ts"
  }
}
```

---

## Usage Examples

### Generate Single Story

```bash
# Generate story for Input component
pnpm generate:story input

# Output: components/html/examples/input.stories.ts
```

### Generate All Stories

```bash
# Generate stories for all components
pnpm generate:stories

# Output: Stories for all 12 components
```

---

## Consistency Checks

### 1. Story File Naming ✅

**Pattern**: `{component-name}.stories.ts`

**Examples**:
- `button.stories.ts` ✅
- `input.stories.ts` ✅
- `dialog.stories.ts` ✅

---

### 2. Story Title Format ✅

**Pattern**: `Web Components/{ComponentName}`

**Examples**:
- `Web Components/Button` ✅
- `Web Components/Input` ✅
- `Web Components/Dialog` ✅

---

### 3. Component Tag Format ✅

**Pattern**: `na-{component-name}`

**Examples**:
- `na-button` ✅
- `na-input` ✅
- `na-dialog` ✅

---

### 4. Required Stories ✅

**Every story file must include**:
- `Default` story
- `autodocs` tag
- Component description
- argTypes for all props

---

## Validation Script

Create a validation script to ensure consistency:

```typescript
// scripts/validate-stories.ts
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function validateStories() {
  const storiesDir = join(process.cwd(), 'components/html/examples');
  const storyFiles = readdirSync(storiesDir)
    .filter(f => f.endsWith('.stories.ts'));
  
  const errors: string[] = [];
  
  storyFiles.forEach(file => {
    const content = readFileSync(join(storiesDir, file), 'utf-8');
    
    // Check required elements
    if (!content.includes('tags: [\'autodocs\']')) {
      errors.push(`${file}: Missing autodocs tag`);
    }
    
    if (!content.includes('export const Default:')) {
      errors.push(`${file}: Missing Default story`);
    }
    
    if (!content.includes('title: \'Web Components/')) {
      errors.push(`${file}: Incorrect title format`);
    }
  });
  
  if (errors.length > 0) {
    console.error('Story validation failed:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
  
  console.log('✅ All stories are consistent!');
}
```

---

## Integration with Existing Workflow

### Current Workflow

```bash
# 1. Generate component
pnpm generate:adapter vanilla

# 2. Create story manually (current)
# Edit components/html/examples/button.stories.ts
```

### Enhanced Workflow

```bash
# 1. Generate component
pnpm generate:adapter vanilla

# 2. Generate story automatically
pnpm generate:story button

# 3. Validate consistency
pnpm validate:stories
```

---

## Next Steps

### Immediate (This Week)

1. **Create Story Generator Script** (2-3 hours)
   - File: `scripts/generate-story.ts`
   - Template: `scripts/templates/story.template.ts`
   - Test with Input component

2. **Add Validation Script** (1 hour)
   - File: `scripts/validate-stories.ts`
   - Add to `package.json` scripts

3. **Document Usage** (30 minutes)
   - Update README
   - Add examples

### Short-term (Next Week)

4. **Integrate with Component Generator** (2-3 hours)
   - Auto-generate stories when component is created
   - Link to component specs

5. **Generate All Stories** (1 day)
   - Use CLI to generate all 11 remaining stories
   - Validate consistency

---

## Comparison: Tools vs Custom Script

| Feature | storybook-genie | story-ui | Custom Script |
|---------|----------------|----------|---------------|
| **Web Components** | ❌ React only | ❓ Unknown | ✅ Yes |
| **No API Key** | ❌ Requires API | ❓ Unknown | ✅ No API needed |
| **Customizable** | ⚠️ Limited | ❓ Unknown | ✅ Fully customizable |
| **Consistent** | ⚠️ AI-generated | ⚠️ AI-generated | ✅ Template-based |
| **Type-safe** | ❌ JavaScript | ❓ Unknown | ✅ TypeScript |
| **Monorepo Support** | ❓ Unknown | ❓ Unknown | ✅ Built for monorepo |

**Winner**: ✅ **Custom Script** - Best fit for our needs

---

## References

- [storybook-genie](https://github.com/eduardconstantin/storybook-genie) - CLI tool reference
- [story-ui](https://github.com/southleft/story-ui) - AI-powered generator
- [Storybook Best Practices](https://storybook.js.org/docs/writing-stories)
- [Our Story Template](./components/html/examples/button.stories.ts)

---

## Conclusion

**Recommended Approach**: Create a **custom CLI script** for generating Storybook stories.

**Benefits**:
- ✅ Tailored to Web Components
- ✅ Consistent structure
- ✅ No external dependencies
- ✅ Type-safe
- ✅ Integrates with existing workflow

**Implementation Time**: 4-6 hours for full implementation

---

**Status**: 📋 **READY TO IMPLEMENT**  
**Last Updated**: 2026-01-03

