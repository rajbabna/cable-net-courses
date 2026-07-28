# Quick Start: Push to GitHub & Deploy

**Time needed:** 10 minutes

---

## Step 1: Create GitHub Repository (2 min)

1. Go to [github.com](https://github.com)
2. Click **+ New repository**
3. Name: `cable-net-courses`
4. Description: `Data cabling and networking LMS platform`
5. Make it **Public** (or Private if you prefer)
6. Click **Create repository**

---

## Step 2: Prepare Local Code (3 min)

In your project folder:

```bash
# Initialize git (if you haven't already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Cable&Net Courses setup"

# Rename branch to main (if needed)
git branch -M main
```

---

## Step 3: Connect to GitHub (2 min)

Replace `YOUR-USERNAME`:

```bash
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## Step 4: Enable GitHub Pages (2 min)

1. On GitHub, go to your repository
2. Click **Settings** (top right)
3. Left sidebar → **Pages**
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
5. Click **Save**

Wait 1-2 minutes...

✅ **Your site is now live at:**
```
https://YOUR-USERNAME.github.io/cable-net-courses
```

---

## Step 5: Add Supabase Credentials (Local Only)

**On your local machine only:**

1. Open `js/config.js`
2. Replace placeholder values:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://YOUR-PROJECT.supabase.co',
     key: 'YOUR-ANON-KEY-HERE'
   };
   ```
3. Save and test locally:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

**Do NOT commit this version to GitHub.**

---

## Step 6: Restore Placeholder Before Next Push

Every time you make changes:

```bash
# 1. Make your changes and test locally

# 2. Before committing, restore placeholder
git checkout js/config.js

# 3. Commit
git add .
git commit -m "Description of changes"

# 4. Push
git push origin main

# 5. Restore your local credentials (manually add them back)
# Edit js/config.js again with your real values for testing
```

---

## Done! ✅

Your site is now:
- ✅ Live on GitHub Pages
- ✅ Version controlled
- ✅ Ready for collaboration
- ✅ Secure (credentials not exposed)

### What's Next?

1. **Test the deployed site:**
   - Go to `https://YOUR-USERNAME.github.io/cable-net-courses`
   - Try creating an account
   - Check browser console for errors

2. **Set up Supabase:**
   - Follow `SETUP_GUIDE.md` to create database tables

3. **Add custom domain (optional):**
   - Follow `DEPLOYMENT.md` → Custom Domain section

---

## Common Commands

```bash
# Check status
git status

# See changes
git diff

# View commit history
git log --oneline

# Make changes after commit
git add .
git commit --amend --no-edit
git push -f origin main

# Undo last commit (careful!)
git reset --soft HEAD~1
```

---

## Troubleshooting

### "Push rejected"
```bash
# Pull latest changes first
git pull origin main
# Then push again
git push origin main
```

### "Site shows 404"
- Go to Settings → Pages
- Verify branch is set to `main`
- Wait 2-3 minutes for build

### "Credentials accidentally committed"
```bash
# Immediately rotate your Supabase key in dashboard
# Then restore placeholder
git checkout js/config.js
git add .
git commit -m "Remove credentials"
git push origin main
# Your key is still exposed in history until you use git-filter-branch
# Best practice: rotate key immediately
```

### "Want to keep credentials in deployment"
- Use GitHub Secrets + Actions workflow (see `DEPLOYMENT.md`)
- Or use Vercel/Netlify (easier environment variable management)

---

## Next: Database Setup

Once deployed, follow `SETUP_GUIDE.md` to:
1. Create Supabase tables
2. Insert sample courses
3. Test signup/login flow

**Questions?** Check `README.md` and `DEPLOYMENT.md`
