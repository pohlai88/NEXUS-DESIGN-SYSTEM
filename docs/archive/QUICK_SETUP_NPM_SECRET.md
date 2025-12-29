# Quick Setup: Add NPM_TOKEN to GitHub Secrets

## ✅ Easiest Method: Web UI

### Step 1: Open GitHub Secrets Page
Click this link (or copy-paste into browser):
```
https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM/settings/secrets/actions
```

### Step 2: Add Secret
1. Click **"New repository secret"** button
2. **Name**: `NPM_TOKEN`
3. **Secret**: `YOUR_NPM_TOKEN_HERE` (get from your npm account)
4. Click **"Add secret"**

### Step 3: Verify
You should see `NPM_TOKEN` listed in your secrets.

---

## ✅ Done!

Once the secret is added, you can publish to npm by:

1. **Creating a GitHub Release** (automatic publish)
   - Go to: https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM/releases/new
   - Tag: `v1.0.0`
   - Title: "v1.0.0 - Initial Release"
   - Click "Publish release"
   - ✅ Workflow will automatically publish to npm

2. **Or use Manual Workflow**
   - Go to: https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM/actions/workflows/publish-npm.yml
   - Click "Run workflow"
   - Enter version: `1.0.0`
   - Click "Run workflow"

---

## 🔍 Verify Secret Was Added

After adding, you can verify it exists (but not see the value):
```powershell
gh secret list
```

---

**That's it!** The web UI method is the simplest and most reliable way to add secrets.

