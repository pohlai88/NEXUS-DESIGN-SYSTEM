# 📦 NPM Publishing Guide - AIBOS Design System

**Package Name**: `@aibos/design-system`  
**Current Version**: 1.0.0  
**Status**: ✅ Ready for Publishing

---

## 🎯 Pre-Publishing Checklist

- ✅ Package built successfully (254 tokens, 172 classes)
- ✅ LICENSE file created (MIT)
- ✅ package.json configured with proper exports
- ✅ .npmignore configured to exclude dev files
- ✅ Documentation files included (API_REFERENCE.md, EXTERNAL_USAGE.md, etc.)
- ✅ prepublishOnly script added
- ✅ Repository URL configured
- ⏳ **Next**: Login to npm and publish

---

## 📝 Publishing Steps

### Step 1: Login to npm

```bash
npm login
```

You'll be prompted for:
- **Username**: Your npm username
- **Password**: Your npm password
- **Email**: Your npm email
- **One-time password (OTP)**: If you have 2FA enabled

### Step 2: Verify Login

```bash
npm whoami
```

Should return your npm username.

### Step 3: Publish Package

```bash
npm publish
```

Or for first-time public publish:

```bash
npm publish --access public
```

### Step 4: Verify Publication

```bash
npm view @aibos/design-system
```

---

## 🔄 Publishing Updates (Future Versions)

### Update Version

```bash
# Patch version (1.0.0 → 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 → 1.1.0) - New features, backward compatible
npm version minor

# Major version (1.0.0 → 2.0.0) - Breaking changes
npm version major
```

### Publish Updated Version

```bash
npm publish
```

---

## 📋 What Gets Published

The following files/directories will be included in the npm package (per package.json `files` field):

```
@aibos/design-system/
├── style.css                          # ⭐ Compiled CSS (main entry)
├── input.css                          # Source CSS
├── dist/
│   ├── tokens.json                    # Design tokens
│   ├── headless-map.json             # Headless API mapping
│   └── tokens/
│       └── index.d.ts                # TypeScript definitions
├── lib/
│   ├── cli-parser.ts                 # CLI utilities
│   ├── cli-autocomplete.ts
│   ├── cli-filter-engine.ts
│   └── cli-commands.ts
├── docs/
│   ├── API_REFERENCE.md              # Complete API reference
│   ├── EXTERNAL_USAGE.md             # External usage guide
│   ├── QUICK_REFERENCE.md            # Quick reference
│   └── INTEGRATION_GUIDE.md          # Integration guide
├── README.md                          # Main documentation
└── LICENSE                            # MIT License
```

### Excluded (via .npmignore)
- node_modules/
- scripts/
- prototypes/
- .vscode/
- Development config files
- Git files

---

## 🚀 After Publishing

### Installation Test

```bash
# Create a test project
mkdir test-aibos
cd test-aibos
npm init -y
npm install @aibos/design-system
```

### Usage Test

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@aibos/design-system/style.css">
</head>
<body>
  <div class="na-card na-p-6">
    <h2 class="na-h2">Test Card</h2>
    <p class="na-body">Design system loaded successfully!</p>
  </div>
</body>
</html>
```

Or in a React/Vue project:

```javascript
import '@aibos/design-system/css';
// or
import '@aibos/design-system';
```

---

## 📊 Package Statistics

| Metric | Value |
|--------|-------|
| **Design Tokens** | 254 |
| **Semantic Classes** | 172 |
| **Package Size** | ~50KB (CSS + JSON) |
| **Dependencies** | 0 (runtime) |
| **License** | MIT |

---

## 🔐 npm Account Requirements

### If You Don't Have an npm Account

1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email
4. Enable 2FA (recommended)

### If Package Name is Taken

If `@aibos/design-system` is already taken, consider:
- `@your-org/@aibos/design-system` (scoped package)
- `aibos-ds`
- `aibos-ui-system`
- `neo-analog-design-system`

---

## 🎯 Quick Publish (All Steps)

```bash
# 1. Build
pnpm build

# 2. Login
npm login

# 3. Verify login
npm whoami

# 4. Publish
npm publish --access public

# 5. Verify
npm view @aibos/design-system
```

---

## ✅ Post-Publish Verification

After publishing, verify:

1. **Package Page**: https://www.npmjs.com/package/@aibos/design-system
2. **Installation**: `npm install @aibos/design-system` works
3. **Documentation**: README displays correctly on npm
4. **Files**: Check the "Files" tab on npm to ensure correct files are included
5. **Version**: Correct version number shows

---

## 📈 Promoting Your Package

After publishing:

1. **Update GitHub README** with npm install badge:
   ```markdown
   [![npm version](https://badge.fury.io/js/@aibos/design-system.svg)](https://www.npmjs.com/package/@aibos/design-system)
   ```

2. **Add to package.json keywords** (already done ✅)

3. **Share on**:
   - Twitter/X
   - LinkedIn
   - Dev.to
   - Reddit (r/webdev, r/javascript)

---

## 🐛 Troubleshooting

### "Package name taken"
```bash
npm publish --access public
# Or use scoped package: @yourname/@aibos/design-system
```

### "Need to login"
```bash
npm login
```

### "Need 2FA code"
Enter the code from your authenticator app when prompted.

### "Version already published"
```bash
npm version patch  # Bump version
npm publish
```

---

## 📞 Support

If you encounter issues:
- npm Support: https://www.npmjs.com/support
- npm Documentation: https://docs.npmjs.com/

---

**Ready to publish!** ✅

Run: `npm login` then `npm publish --access public`
