# Migration Guide: aibos-design-system → @aibos/design-system

**Status**: `aibos-design-system` is deprecated. Migrate to `@aibos/design-system`.

---

## Quick Migration (3 Steps)

### Step 1: Update Package Installation

```bash
# Remove old package
npm uninstall aibos-design-system
# or
pnpm remove aibos-design-system
# or
yarn remove aibos-design-system

# Install new package
npm install @aibos/design-system
# or
pnpm add @aibos/design-system
# or
yarn add @aibos/design-system
```

### Step 2: Update Import Statements

**CSS Imports:**
```tsx
// ❌ Old
import 'aibos-design-system/css';
import 'aibos-design-system';

// ✅ New
import '@aibos/design-system/css';
import '@aibos/design-system';
```

**React Components:**
```tsx
// ❌ Old
import { StatusIndicator, Card, Button } from 'aibos-design-system/react';

// ✅ New
import { StatusIndicator, Card, Button } from '@aibos/design-system/react';
```

**Design Tokens:**
```tsx
// ❌ Old
import tokens from 'aibos-design-system/tokens';
import type { DesignTokens } from 'aibos-design-system/tokens/typescript';
import { designTokens } from 'aibos-design-system/design-tokens';

// ✅ New
import tokens from '@aibos/design-system/tokens';
import type { DesignTokens } from '@aibos/design-system/tokens/typescript';
import { designTokens } from '@aibos/design-system/design-tokens';
```

**Types:**
```tsx
// ❌ Old
import type { AIBOSStatusVariant } from 'aibos-design-system/types';

// ✅ New
import type { AIBOSStatusVariant } from '@aibos/design-system/types';
```

**Utils:**
```tsx
// ❌ Old
import { cn } from 'aibos-design-system/utils';

// ✅ New
import { cn } from '@aibos/design-system/utils';
```

### Step 3: Update package.json Dependencies

```json
{
  "dependencies": {
    // ❌ Old
    // "aibos-design-system": "^1.1.0"
    
    // ✅ New
    "@aibos/design-system": "^1.1.0"
  }
}
```

---

## Complete Example Migration

### Before (Old Package)

```tsx
// app/layout.tsx
import 'aibos-design-system/css';

// components/Card.tsx
import { Card, CardBody } from 'aibos-design-system/react';
import { StatusIndicator } from 'aibos-design-system/react';
import type { AIBOSStatusVariant } from 'aibos-design-system/types';
import { designTokens } from 'aibos-design-system/design-tokens';

export function VendorCard({ vendor }) {
  return (
    <Card>
      <CardBody>
        <h2 className="na-h4">{vendor.name}</h2>
        <div className="na-data">${vendor.amount}</div>
        <StatusIndicator variant="success" label="Approved" />
      </CardBody>
    </Card>
  );
}
```

### After (New Package)

```tsx
// app/layout.tsx
import '@aibos/design-system/css';

// components/Card.tsx
import { Card, CardBody } from '@aibos/design-system/react';
import { StatusIndicator } from '@aibos/design-system/react';
import type { AIBOSStatusVariant } from '@aibos/design-system/types';
import { designTokens } from '@aibos/design-system/design-tokens';

export function VendorCard({ vendor }) {
  return (
    <Card>
      <CardBody>
        <h2 className="na-h4">{vendor.name}</h2>
        <div className="na-data">${vendor.amount}</div>
        <StatusIndicator variant="success" label="Approved" />
      </CardBody>
    </Card>
  );
}
```

---

## Automated Migration (Find & Replace)

### VS Code / Cursor

1. Open Find & Replace (Ctrl+Shift+H / Cmd+Shift+H)
2. Enable regex mode (.*)
3. Find: `aibos-design-system`
4. Replace: `@aibos/design-system`
5. Replace All

### Command Line (PowerShell)

```powershell
# Find all files with old package name
Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx,*.json | 
  Select-String "aibos-design-system" | 
  Select-Object Path, LineNumber, Line

# Replace in all files (use with caution - backup first!)
Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx,*.json | 
  ForEach-Object {
    (Get-Content $_.FullName) -replace 'aibos-design-system', '@aibos/design-system' | 
    Set-Content $_.FullName
  }
```

---

## Breaking Changes

**None!** The API is identical. Only the package name changed.

- ✅ All exports remain the same
- ✅ All CSS classes remain the same
- ✅ All TypeScript types remain the same
- ✅ All component APIs remain the same

---

## Deprecation Notice

The old `aibos-design-system` package will:

1. **Receive a deprecation notice** on npm
2. **Point to the new package** in the deprecation message
3. **Continue to work** but will not receive updates
4. **Be removed** in a future major version

---

## Support

If you encounter issues during migration:

1. Check that you've updated all import statements
2. Verify `package.json` has the new package name
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
4. Check for any hardcoded references in build scripts or config files

---

## Timeline

- **v1.1.0**: Package migrated to `@aibos/design-system`
- **v1.2.0**: Old package marked as deprecated on npm
- **v2.0.0**: Old package will be removed (future)

---

**Questions?** Open an issue on GitHub or check the [documentation](./README.md).

