# Cable&Net Courses — Deployment Guide

Deploy your project to GitHub Pages or other hosting platforms while keeping Supabase credentials secure.

---

## GitHub Pages (Easiest Method)

### Step 1: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Cable&Net Courses setup"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Select:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch)
   - **Folder:** `/ (root)`
4. Click **Save**

Your site will be available at: `https://YOUR-USERNAME.github.io/cable-net-courses`

### Step 3: Set Up Credentials for Deployment

**Option A: Local Credentials Only (Simple)**

1. Keep `js/config.js` with placeholder values in GitHub
2. Manually update locally before running:
   ```bash
   # Local machine only
   # Edit js/config.js with real credentials
   # Test locally
   # Don't commit this version
   git checkout js/config.js  # Restore placeholder
   ```

**Option B: GitHub Secrets + Build Script (Secure)**

If you want to automate credential injection:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Create config.js with environment variables
      run: |
        cat > js/config.js << EOF
        window.SUPABASE_CONFIG = {
          url: '${{ secrets.VITE_SUPABASE_URL }}',
          key: '${{ secrets.VITE_SUPABASE_ANON_KEY }}'
        };
        EOF
    
    - name: Upload to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

2. Add Secrets to GitHub:
   - Go to Settings → Secrets and variables → Actions
   - Create two secrets:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Every push will now inject credentials automatically

---

## Alternative Hosting Platforms

### Vercel (Recommended for Features)

1. **Connect GitHub repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Authorize Vercel

2. **Add environment variables:**
   - Project Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = your URL
     - `VITE_SUPABASE_ANON_KEY` = your key

3. **Add build command** (if needed):
   - Build Command: (leave empty for static site)
   - Output Directory: `.` (root)

4. **Deploy:** Vercel automatically deploys on every push

**Advantages:**
- Automatic HTTPS
- Global CDN
- Edge functions (for later)
- Preview deployments

### Netlify

1. **Connect GitHub:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - "Import an existing project"
   - Select your repository

2. **Configure build:**
   - Build command: (leave empty)
   - Publish directory: `.` (root)

3. **Add environment variables:**
   - Site settings → Build & deploy → Environment
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Deploy:** Automatic on push

### Self-Hosted (VPS/Server)

For hosting on your own server (e.g., AWS EC2, DigitalOcean):

```bash
# 1. SSH into your server
ssh user@your-server.com

# 2. Clone the repository
git clone https://github.com/YOUR-USERNAME/cable-net-courses.git
cd cable-net-courses

# 3. Create js/config.js with your credentials
cat > js/config.js << EOF
window.SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',
  key: 'your-anon-key-here'
};
EOF

# 4. Serve with a web server
# Using Python
python3 -m http.server 80

# Or using Node.js (recommended)
npx http-server -p 80

# Or using Nginx (production)
# Configure nginx.conf to serve from your project directory
```

---

## Security Checklist

Before deploying to production:

### ✅ Credentials
- [ ] `js/config.js` has placeholder values in GitHub
- [ ] Real credentials only in local machine or CI/CD secrets
- [ ] `.gitignore` includes any env files
- [ ] No credentials in commit history

### ✅ Supabase Configuration
- [ ] Database tables created (`profiles`, `courses`, `enrollments`)
- [ ] Row Level Security (RLS) policies configured
- [ ] Supabase allowed origins updated for your domain
- [ ] Auth confirmation emails enabled

### ✅ Site Configuration
- [ ] All paths are relative (no hardcoded `localhost`)
- [ ] CSS loads correctly (check inspector)
- [ ] JavaScript loads in right order (config → client → logic)
- [ ] Links point to correct files

### ✅ Testing
- [ ] Sign up works and redirects to pending
- [ ] Login works with real credentials
- [ ] Courses load on home page
- [ ] Role-based redirect works (student vs admin)

---

## Environment Variables Reference

### For Vercel/Netlify/GitHub Actions:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### For Local Development:

Edit `js/config.js`:
```javascript
window.SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

**Always restore placeholder before pushing to GitHub:**
```bash
git checkout js/config.js
git add .
git commit -m "Feature updates"
git push
```

---

## Custom Domain (Optional)

### GitHub Pages Custom Domain

1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. Go to your repository Settings → Pages
3. Under "Custom domain", enter your domain: `yoursite.com`
4. Update DNS records at your registrar:
   ```
   CNAME: yoursite.com → YOUR-USERNAME.github.io
   ```
5. GitHub will auto-configure HTTPS with Let's Encrypt

### Vercel/Netlify Custom Domain

1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed
4. HTTPS is automatic

---

## Monitoring & Updates

### Check Deployment Status
- **GitHub Pages:** Settings → Pages (shows deployment status)
- **Vercel:** Dashboard shows build history
- **Netlify:** Deployments tab shows all builds

### Update Code
```bash
# Make changes locally
# Test with `python -m http.server 8000`

# Before committing
git checkout js/config.js  # Ensure placeholder is used

# Commit and push
git add .
git commit -m "Description"
git push origin main

# Deployment happens automatically
```

### Update Supabase Data
- Admin dashboard: Coming in Phase 3
- Manual: Supabase console

---

## Troubleshooting Deployment

### "Site shows 404"
- Verify file paths are relative (no `/cable-net-courses` prefix needed)
- Check GitHub Pages settings → branch is set correctly
- Wait 1-2 minutes for build to complete

### "JavaScript doesn't load"
- Check browser console (F12) → Network tab
- Verify script paths: `js/config.js`, `js/supabase-client.js`
- Check that `config.js` loads before other scripts

### "Can't connect to Supabase"
- Verify credentials in `js/config.js`
- Check Supabase console → Authentication enabled
- Verify domain is in CORS allowed origins
- Check browser console for CORS errors

### "Database queries return 401"
- Check Supabase Row Level Security policies
- Verify user is authenticated
- Check database permissions for role

---

## Reverting Deployments

### GitHub Pages
1. Go to Settings → Pages
2. Deployments tab shows history
3. Click the ⟳ icon to redeploy previous version

### Vercel
1. Go to Deployments tab
2. Find the version you want
3. Click "Promote to Production"

### Netlify
1. Go to Deployments
2. Find the version
3. Click "Publish deploy"

---

## Production Checklist

Before going live:

```
DEPLOYMENT READY CHECKLIST
=========================

Repository
□ Code pushed to GitHub
□ No credentials in commits
□ README.md updated
□ .gitignore configured

Hosting
□ GitHub Pages/Vercel/Netlify configured
□ Custom domain set up (optional)
□ HTTPS enabled
□ Build/deployment successful

Supabase
□ Tables created (profiles, courses, enrollments)
□ Sample data inserted
□ RLS policies configured
□ Auth enabled
□ CORS origins updated

Testing
□ Signup flow works
□ Login flow works
□ Role-based redirect works
□ Courses load
□ Admin dashboard accessible
□ Mobile responsive

Final
□ Notify stakeholders
□ Share deployed URL
□ Monitor browser console for errors
□ Set up error logging (optional)
```

---

## Questions?

- Supabase: https://supabase.com/docs
- GitHub Pages: https://docs.github.com/en/pages
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
