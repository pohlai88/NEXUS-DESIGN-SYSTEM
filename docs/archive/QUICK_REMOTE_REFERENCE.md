# Quick Remote Reference

## Current Remotes

- **`origin`** → `https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM.git` (Main Design System)
- **`storybook`** → `https://github.com/pohlai88/Storybook.git` (Storybook Documentation)

## Common Commands

### Push to Main Repository Only
```bash
git push origin main
```

### Push to Storybook Repository Only
```bash
git push storybook main
```

### Push to Both Repositories
```bash
git push origin main && git push storybook main
```

Or use the helper script:
```powershell
.\scripts\push-all.ps1
```

### Check Remote Status
```bash
git remote -v
```

### View All Branches (including remotes)
```bash
git branch -a
```

## Workflow Examples

### Example 1: Update Design System (push to main only)
```bash
git add .
git commit -m "Update design system components"
git push origin main
```

### Example 2: Update Storybook (push to both)
```bash
git add .storybook storybook-static
git commit -m "Update Storybook configuration"
git push origin main
git push storybook main
```

### Example 3: Push Everything to Both
```bash
git add .
git commit -m "General updates"
.\scripts\push-all.ps1
```

