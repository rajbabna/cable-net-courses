# Cable&Net Courses — Getting Started Guide

**Complete workflow from local development → GitHub → Live deployment**

---

## What You Have

A fully functional LMS platform with:
- ✅ Responsive design (T568B cable-inspired theme)
- ✅ Shared login with role-based redirect
- ✅ Student & admin dashboards
- ✅ Supabase integration
- ✅ GitHub Pages ready

---

## 3-Stage Workflow

### Stage 1: Local Development
**Goal:** Test everything locally before uploading to GitHub

**Duration:** 5-10 minutes

```bash
# 1. Navigate to project folder
cd cable-net-courses

# 2. Edit js/config.js with YOUR real Supabase credentials
# (Your credentials stay LOCAL only)
cat > js/config.js << 'EOF'
window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  key: 'YOUR-ANON-KEY'
};
EOF

# 3. Start local server
python -m http.server 8000

# 4. Visit http://localhost:8000
# Test: Sign up → should go to pending.html
```

**Checklist:**
- [ ] Local server running
- [ ] Site loads at localhost:8000
- [ ] Signup form works
- [ ] Supabase tables exist

---

### Stage 2: Push to GitHub
**Goal:** Upload code to GitHub (WITHOUT credentials)

**Duration:** 10 minutes

See: **`GITHUB_QUICK_START.md`** for step-by-step

**Quick version:**
```bash
# 1. Restore placeholder credentials
git checkout js/config.js

# 2. Commit all files
git init
git add .
git commit -m "Initial Cable&Net Courses setup"

# 3. Create repository on GitHub.com

# 4. Connect and push
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git
git push -u origin main

# 5. Enable GitHub Pages in Settings
```

**Checklist:**
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `js/config.js` has placeholder values (not real credentials)
- [ ] GitHub Pages enabled

---

### Stage 3: Deploy & Test
**Goal:** Site live on GitHub Pages

**Duration:** 5 minutes

1. Go to `https://YOUR-USERNAME.github.io/cable-net-courses`
2. See the home page ✅
3. Click "Log in" → form appears ✅
4. Click "Create account" → can fill form ✅

**Troubleshooting:**
- "Site shows 404" → Check GitHub Pages settings
- "Buttons don't work" → Check browser console (F12)
- "Can't see styles" → Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## Files by Purpose

### Read First (In Order)

1. **`GITHUB_QUICK_START.md`** ← Start here
   - 10-minute checklist to push code to GitHub
   - Create GitHub repository
   - Enable GitHub Pages

2. **`SETUP_GUIDE.md`** ← Database setup
   - Create Supabase tables
   - Insert sample data
   - Configure auth

3. **`DEPLOYMENT.md`** ← Advanced deployments
   - GitHub Actions/Secrets
   - Vercel, Netlify, self-hosted
   - Custom domains

4. **`README.md`** ← Project overview
   - Architecture
   - How authentication works
   - Development workflow

5. **`FILE_INVENTORY.md`** ← What to upload
   - Complete file listing
   - Security checklist
   - What to commit vs. exclude

### Reference During Development

- **`style.css`** — Design system (T568B theme)
- **`js/config.js`** — Supabase credentials (local only)
- **`js/auth-form.js`** — Login/signup logic
- **`js/supabase-client.js`** — Supabase SDK init
- **`.gitignore`** — Git exclusion rules

---

## Quick Answers

### "Do I need npm/Node.js?"
No. This is vanilla JavaScript. Works in any browser.

### "Where do I add my Supabase credentials?"
**Local only:** Edit `js/config.js`
**Never:** Commit real credentials to GitHub

### "How do I prevent accidentally committing credentials?"
1. Add to `.gitignore` (already done)
2. Run `git checkout js/config.js` before each commit
3. Use GitHub Secrets for CI/CD (optional)

### "What if I already committed credentials to GitHub?"
1. ⚠️ Rotate your Supabase key immediately (Settings → API)
2. Restore placeholder: `git checkout js/config.js`
3. Commit & push

### "Can I use my own domain?"
Yes! See `DEPLOYMENT.md` → Custom Domain section

### "How do I add new features?"
1. Edit HTML/CSS/JS files locally
2. Test with `python -m http.server 8000`
3. Before push: `git checkout js/config.js` (to remove real creds)
4. Commit & push

### "What's the difference between local and deployed?"
| | Local | Deployed |
|---|-------|----------|
| Server | `http://localhost:8000` | `https://YOUR-USERNAME.github.io/cable-net-courses` |
| Credentials | Real (in `js/config.js`) | Placeholder (will need real for production) |
| Updates | Instant (refresh browser) | Takes 1-2 min (GitHub Pages build) |

---

## Development Workflow

### Daily Work

```
1. Start day:
   git pull origin main
   
2. Edit files:
   - Edit .html / .css / .js
   - Start local server: python -m http.server 8000
   - Test at http://localhost:8000
   
3. Commit changes:
   git checkout js/config.js          # Restore placeholder
   git add .
   git commit -m "Description"
   git push origin main
   
4. After push:
   Manually re-add real credentials to js/config.js (local only)
   Continue testing
```

### Sample Commit Workflow

```bash
# You edited login.html to fix a bug
git status                           # See what changed

# Before committing, restore placeholder
git checkout js/config.js           

# Verify it's the placeholder
cat js/config.js                    # Should show 'your-project.supabase.co'

# Commit
git add .
git commit -m "Fix: login button hover state"

# Push to GitHub
git push origin main

# Back to local development - restore your real credentials
# Manually edit js/config.js again with real values
nano js/config.js                   # or your editor
# Add your credentials back
# Test locally
```

---

## Folder Organization

After pushing to GitHub, your repository structure will be:

```
cable-net-courses/                    ← Your GitHub repository
├── .git/                             ← Auto-managed by git
├── .gitignore                        ← Tells git what to ignore
├── .env.example                      ← Template for environment
│
├── GETTING_STARTED.md                ← This file
├── GITHUB_QUICK_START.md             ← First steps
├── README.md                         ← Project overview
├── SETUP_GUIDE.md                    ← Database setup
├── DEPLOYMENT.md                     ← Advanced deployment
├── FILE_INVENTORY.md                 ← What's included
│
├── index-dynamic.html                ← Home page
├── login.html                        ← Login/signup
├── pending.html                      ← Approval pending
├── student-dashboard.html            ← Student view
├── instructor-dashboard.html         ← Admin view
│
├── css/
│   └── style.css                     ← All styling
│
└── js/
    ├── config.js                     ← Supabase config (update locally)
    ├── supabase-client.js            ← Supabase SDK
    ├── auth-form.js                  ← Login logic
    └── load-courses.js               ← Course loader
```

---

## Common Errors & Solutions

### Error: "git not found"
```bash
# Install git from git-scm.com or use package manager
# macOS: brew install git
# Ubuntu: sudo apt install git
# Windows: Download from https://git-scm.com
```

### Error: "python -m http.server: Permission denied"
```bash
# Try Python 3 specifically
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000
```

### Error: "Push rejected"
```bash
# Pull first, then push
git pull origin main
git push origin main
```

### Error: "Site shows 404 on GitHub Pages"
```
Solution:
1. Go to your repository
2. Settings → Pages
3. Change source to: "Deploy from a branch"
4. Select branch: main, folder: / (root)
5. Save
6. Wait 1-2 minutes
7. Refresh your GitHub Pages URL
```

### Error: "Credentials committed to GitHub"
```bash
# Immediate action: Rotate Supabase key (don't delay!)
# Then clean up:
git checkout js/config.js
git add .
git commit -m "Remove real credentials"
git push origin main
```

---

## Next Steps

1. **Right now:**
   - [ ] Open `GITHUB_QUICK_START.md`
   - [ ] Follow the 5 steps
   - [ ] Push code to GitHub

2. **After pushing:**
   - [ ] Enable GitHub Pages (in Settings)
   - [ ] Test your site live

3. **Set up database:**
   - [ ] Open `SETUP_GUIDE.md`
   - [ ] Create Supabase tables
   - [ ] Insert sample data

4. **Test the platform:**
   - [ ] Sign up as a student
   - [ ] Approve in Supabase console
   - [ ] Login as student → see dashboard
   - [ ] Create admin account and test admin dashboard

5. **Customize:**
   - [ ] Add your courses to database
   - [ ] Edit `README.md` with your project details
   - [ ] Configure custom domain (optional)

---

## Getting Help

| Question | File to Check |
|----------|---|
| "How do I push to GitHub?" | `GITHUB_QUICK_START.md` |
| "What files do I upload?" | `FILE_INVENTORY.md` |
| "How do I set up the database?" | `SETUP_GUIDE.md` |
| "How do I deploy?" | `DEPLOYMENT.md` |
| "How does the auth system work?" | `README.md` |
| "What's the project structure?" | `README.md` → Project Structure |

---

## Key Principles

1. **Credentials Stay Local**
   - Never commit `js/config.js` with real values
   - Always restore placeholder before pushing

2. **GitHub is Safe**
   - Only placeholder values in repository
   - Real credentials only on your machine

3. **GitHub Pages is Free**
   - Unlimited deployments
   - Auto-updates when you push
   - HTTPS included

4. **Testing is Key**
   - Always test locally first
   - Test on deployed site after push
   - Check browser console for errors

---

## Timeline

**First Day:**
- [ ] Stage 1: Local testing (5 min)
- [ ] Stage 2: Push to GitHub (10 min)
- [ ] Stage 3: Deploy & verify (5 min)
- **Total:** ~20 minutes

**Week 1:**
- [ ] Set up Supabase database (30 min)
- [ ] Test all auth flows (15 min)
- [ ] Add your course data (30 min)
- [ ] Customize design/content (1-2 hours)

**Week 2+:**
- [ ] Build student dashboard (Phase 2)
- [ ] Build instructor dashboard (Phase 3)
- [ ] Add course content and materials

---

## Success Checklist

When you're done:

- [ ] Code pushed to GitHub
- [ ] GitHub Pages live and accessible
- [ ] Supabase tables created
- [ ] Signup/login works locally
- [ ] Role-based redirect working
- [ ] Site accessible at `https://YOUR-USERNAME.github.io/cable-net-courses`
- [ ] No credentials in GitHub repository
- [ ] Browser console shows no errors

---

## You're Ready! 🚀

Start with **`GITHUB_QUICK_START.md`** right now.

It's a 10-minute process to get your code live on GitHub Pages.

After that, follow `SETUP_GUIDE.md` to configure your database.

---

**Questions?** All documentation is linked in each guide.

**Good luck! 🎯**
