# Managing Multiple GitHub Repositories from Single Local Repo

## Overview

This guide shows how to manage **2 GitHub repositories** from a **single local repository**.

**Use Case:**
- Local: One repository with all code
- GitHub Repo 1: `AIBOS-DESIGN-SYSTEM` (main design system)
- GitHub Repo 2: `Storybook` (Storybook-specific deployment)

---

## Method 1: Multiple Git Remotes (Recommended)

### Setup

```bash
# Check current remotes
git remote -v

# Add second remote (e.g., for Storybook)
git remote add storybook https://github.com/pohlai88/Storybook.git

# Verify both remotes
git remote -v
```

**Output:**
```
origin     https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM.git (fetch)
origin     https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM.git (push)
storybook  https://github.com/pohlai88/Storybook.git (fetch)
storybook  https://github.com/pohlai88/Storybook.git (push)
```

### Pushing to Different Repositories

```bash
# Push to main repository (origin)
git push origin main

# Push to Storybook repository
git push storybook main

# Push to both at once
git push origin main && git push storybook main
```

### Setting Up Different Branches

```bash
# Create a branch for Storybook
git checkout -b storybook-main

# Push Storybook branch to Storybook repo
git push storybook storybook-main:main

# Push main branch to main repo
git checkout main
git push origin main
```

---

## Method 2: Git Subtree (Split Parts of Repo)

Use this if you want to push **only specific folders** to different repositories.

### Setup Subtree

```bash
# Add Storybook as subtree remote
git remote add storybook-subtree https://github.com/pohlai88/Storybook.git

# Push only .storybook folder to Storybook repo
git subtree push --prefix=.storybook storybook-subtree main

# Or push storybook-static folder
git subtree push --prefix=storybook-static storybook-subtree main
```

### Automated Script

Create `scripts/push-storybook.sh`:

```bash
#!/bin/bash
# Push Storybook files to separate repository

git subtree push --prefix=.storybook storybook-subtree main
git subtree push --prefix=storybook-static storybook-subtree main
```

---

## Method 3: Selective Push with Different Branches

### Setup

```bash
# Create Storybook-specific branch
git checkout -b storybook-deploy

# Add Storybook remote
git remote add storybook https://github.com/pohlai88/Storybook.git

# Configure branch to track Storybook remote
git branch --set-upstream-to=storybook/main storybook-deploy
```

### Workflow

```bash
# Work on main branch
git checkout main
# ... make changes ...
git add .
git commit -m "Update design system"
git push origin main

# Switch to Storybook branch and sync
git checkout storybook-deploy
git merge main  # or cherry-pick specific commits
git push storybook storybook-deploy:main
```

---

## Method 4: Separate Directories with Shared Code (Advanced)

If you need completely separate histories:

```bash
# Clone main repo
git clone https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM.git main-repo
cd main-repo

# Add Storybook as subtree
git subtree add --prefix=storybook https://github.com/pohlai88/Storybook.git main --squash

# Later, push changes back
git subtree push --prefix=storybook https://github.com/pohlai88/Storybook.git main
```

---

## Recommended Setup for Your Project

Based on your current setup, I recommend **Method 1 (Multiple Remotes)**:

### Step-by-Step Setup

```bash
# 1. Add Storybook remote
git remote add storybook https://github.com/pohlai88/Storybook.git

# 2. Verify setup
git remote -v

# 3. Create helper scripts
```

### Helper Scripts

**`scripts/push-all.sh`** (Push to both repos):
```bash
#!/bin/bash
echo "Pushing to AIBOS-DESIGN-SYSTEM..."
git push origin main

echo "Pushing to Storybook..."
git push storybook main
```

**`scripts/push-storybook-only.sh`** (Push only to Storybook):
```bash
#!/bin/bash
echo "Pushing to Storybook repository..."
git push storybook main
```

### PowerShell Scripts (Windows)

**`scripts/push-all.ps1`**:
```powershell
Write-Host "Pushing to AIBOS-DESIGN-SYSTEM..." -ForegroundColor Cyan
git push origin main

Write-Host "Pushing to Storybook..." -ForegroundColor Cyan
git push storybook main

Write-Host "Done!" -ForegroundColor Green
```

---

## Workflow Examples

### Example 1: Push Everything to Both Repos

```bash
# Make changes
git add .
git commit -m "Update components"

# Push to both
git push origin main
git push storybook main
```

### Example 2: Push Only to Main Repo

```bash
git add .
git commit -m "Internal changes"
git push origin main  # Only push to main repo
```

### Example 3: Push Only Storybook Changes

```bash
git add .storybook storybook-static
git commit -m "Update Storybook"
git push storybook main  # Only push to Storybook repo
```

---

## Managing Different Content

If you want **different content** in each repository:

### Option A: Use .gitignore per Remote

Not directly supported, but you can use:

```bash
# Create separate branches
git checkout -b storybook-only

# Remove files not needed for Storybook
git rm -r --cached <files-to-exclude>
git commit -m "Prepare Storybook-only branch"

# Push to Storybook repo
git push storybook storybook-only:main
```

### Option B: Use Git Subtree (Recommended for Different Content)

```bash
# Push only Storybook-related files
git subtree push --prefix=.storybook storybook-subtree main
git subtree push --prefix=storybook-static storybook-subtree main
git subtree push --prefix=components storybook-subtree main
```

---

## Troubleshooting

### Issue: "Remote already exists"

```bash
# Remove existing remote
git remote remove storybook

# Add again
git remote add storybook https://github.com/pohlai88/Storybook.git
```

### Issue: Different commit histories

```bash
# Force push (use with caution)
git push storybook main --force

# Or merge histories
git pull storybook main --allow-unrelated-histories
```

### Issue: Authentication

```bash
# Use SSH instead of HTTPS
git remote set-url storybook git@github.com:pohlai88/Storybook.git

# Or use personal access token
git remote set-url storybook https://<token>@github.com/pohlai88/Storybook.git
```

---

## Best Practices

1. **Use descriptive remote names**: `origin`, `storybook`, `production`
2. **Document your setup**: Add remotes to README
3. **Use branches**: Keep `main` for main repo, `storybook-main` for Storybook
4. **Automate with scripts**: Create push scripts for common workflows
5. **Be careful with force push**: Only use on Storybook repo if needed

---

## Quick Reference

```bash
# List remotes
git remote -v

# Add remote
git remote add <name> <url>

# Remove remote
git remote remove <name>

# Push to specific remote
git push <remote-name> <branch>

# Push to all remotes
git remote | xargs -I {} git push {} main
```

---

## Next Steps

1. Add Storybook remote: `git remote add storybook <url>`
2. Test push: `git push storybook main`
3. Create helper scripts for automation
4. Document your workflow in README

