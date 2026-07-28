# File Inventory & GitHub Upload Checklist

Complete list of all files. Check off what to include/exclude from GitHub.

---

## Directory Structure

```
cable-net-courses/
├── .git/                          # ← Auto-created by git init
├── .gitignore                     # ✅ COMMIT
├── .env.example                   # ✅ COMMIT (template only)
│
├── README.md                      # ✅ COMMIT
├── SETUP_GUIDE.md                 # ✅ COMMIT
├── DEPLOYMENT.md                  # ✅ COMMIT
├── GITHUB_QUICK_START.md          # ✅ COMMIT
├── FILE_INVENTORY.md              # ✅ COMMIT
│
├── index-dynamic.html             # ✅ COMMIT
├── login.html                     # ✅ COMMIT
├── pending.html                   # ✅ COMMIT
├── student-dashboard.html         # ✅ COMMIT
├── instructor-dashboard.html      # ✅ COMMIT
│
├── css/
│   └── style.css                  # ✅ COMMIT
│
└── js/
    ├── config.js                  # ⚠️  COMMIT with PLACEHOLDER values only
    │                              #    (locally: replace with real values, don't commit)
    ├── supabase-client.js         # ✅ COMMIT
    ├── auth-form.js               # ✅ COMMIT
    └── load-courses.js            # ✅ COMMIT
```

---

## Files to Commit to GitHub

### Documentation (Always Safe)
- [x] `.gitignore`
- [x] `.env.example`
- [x] `README.md`
- [x] `SETUP_GUIDE.md`
- [x] `DEPLOYMENT.md`
- [x] `GITHUB_QUICK_START.md`
- [x] `FILE_INVENTORY.md`

### HTML Pages (Always Safe)
- [x] `index-dynamic.html`
- [x] `login.html`
- [x] `pending.html`
- [x] `student-dashboard.html`
- [x] `instructor-dashboard.html`

### CSS (Always Safe)
- [x] `css/style.css`

### JavaScript (Mostly Safe)
- [x] `js/supabase-client.js` — Safe to commit
- [x] `js/auth-form.js` — Safe to commit
- [x] `js/load-courses.js` — Safe to commit
- [x] `js/config.js` — **Only with placeholder values**

---

## Files to Exclude from GitHub

### Credentials & Secrets
- ❌ `js/config.js` **WITH REAL VALUES** (only commit placeholder)
- ❌ `.env` (if you create one)
- ❌ `.env.local` (local development only)
- ❌ `*.key` or `*.pem` files

### Generated/Temporary
- ❌ `.git/` — Auto-created by git
- ❌ `node_modules/` — Auto-installed
- ❌ `dist/`, `build/` — Build output
- ❌ `.DS_Store` — macOS file
- ❌ `Thumbs.db` — Windows file
- ❌ `*.log` — Log files

---

## Checklist: Before First Push to GitHub

### Prepare Files
- [ ] All HTML files updated to include `js/config.js` script tag
- [ ] All HTML files reference correct CSS path: `css/style.css`
- [ ] `js/config.js` contains placeholder values (NOT real credentials)
- [ ] `README.md` updated with your project info
- [ ] `.gitignore` is in place

### Create .gitignore Entry
Ensure `.gitignore` includes:
```
.env
.env.local
.env.*.local
.DS_Store
Thumbs.db
*.log
node_modules/
dist/
build/
```

### Verify Credentials
```bash
# Check what's in config.js
cat js/config.js

# Should show:
# window.SUPABASE_CONFIG = {
#   url: 'https://your-project.supabase.co',
#   key: 'your-anon-key-here'
# };

# If it shows real values, restore:
git checkout js/config.js
```

### Git Setup
```bash
git init
git add .
git commit -m "Initial Cable&Net Courses setup"
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git
git push -u origin main
```

---

## Checklist: Local Development Workflow

Each time you work on the project:

### Start
- [ ] Open terminal in `cable-net-courses/` folder
- [ ] Optionally start local server: `python -m http.server 8000`
- [ ] Edit `js/config.js` with your real Supabase credentials
- [ ] Make your code changes
- [ ] Test locally

### Before Committing
- [ ] Stop local server
- [ ] Restore placeholder in `js/config.js`: `git checkout js/config.js`
- [ ] Verify: `cat js/config.js | grep "your-project"` (should show placeholder)

### Commit & Push
```bash
git add .
git commit -m "Feature: description of changes"
git push origin main
```

### After Push
- [ ] Re-add your real credentials to `js/config.js` (local only)
- [ ] Test again locally
- [ ] Check GitHub to verify code was pushed

---

## What Gets Uploaded

### Summary

```
✅ Safe to Upload (No sensitive data)
├── HTML files (5 files)
├── CSS file (1 file)
├── JavaScript logic (3 files)
├── Documentation (7 files)
└── .gitignore & .env.example

⚠️  Upload with Care
└── js/config.js (only with placeholder values)

❌ Never Upload
├── Real Supabase credentials
├── API keys or tokens
├── .env with secrets
└── Personal/sensitive data
```

---

## File Size Reference

All files are small (< 50KB each):
- HTML pages: 2-3 KB each
- CSS: ~15 KB
- JavaScript: ~3 KB each
- Total project: ~100 KB

✅ No need to compress or optimize at this stage.

---

## What Happens on GitHub Pages

When you push to GitHub:

1. GitHub stores all your files
2. GitHub Pages builds your site from:
   - `index-dynamic.html` (home)
   - `css/style.css` (styling)
   - `js/*.js` (logic)
3. Site is accessible at `https://YOUR-USERNAME.github.io/cable-net-courses`

---

## Security Summary

| File | Can Commit? | Why |
|------|------------|-----|
| `js/config.js` (placeholder) | ✅ Yes | No real data |
| `js/config.js` (real creds) | ❌ No | Exposes API key |
| HTML files | ✅ Yes | No secrets inside |
| CSS | ✅ Yes | Styling only |
| `README.md` | ✅ Yes | Documentation |
| `.env` (with secrets) | ❌ No | API keys exposed |
| Database schema SQL | ✅ Yes | No secrets in schema |

---

## Deployment Paths

After pushing to GitHub:

```
Local Machine
├── js/config.js (REAL credentials for testing)
└── Files pushed to GitHub
    └── GitHub Repository
        ├── js/config.js (PLACEHOLDER values)
        └── GitHub Pages Hosted
            └── https://YOUR-USERNAME.github.io/cable-net-courses
                └── Browser fetches
                    └── js/config.js (placeholder)
                    └── But YOUR LOCAL tests use real credentials
```

---

## Questions About Specific Files?

### "Can I upload package.json?"
Not needed yet. No npm dependencies currently. Add if you later add a build process.

### "Should I upload node_modules?"
❌ Never. Use `.gitignore` to exclude. Regenerate locally with `npm install`.

### "Where do I put the database backup?"
❌ Not in GitHub. Use Supabase Console → Database → Backups or Vercel Postgres backups.

### "Can I upload .env?"
❌ Never commit `.env`. Use `.env.example` as template only.

### "What about API docs?"
✅ Yes, commit them to the docs folder or as `API.md`.

---

## Next Steps

1. **Prepare local code** (this checklist)
2. **Create GitHub repository** (GITHUB_QUICK_START.md)
3. **Push code to GitHub** (git push)
4. **Enable GitHub Pages** (GITHUB_QUICK_START.md)
5. **Set up database** (SETUP_GUIDE.md)
6. **Test deployed site**

---

## Reference

| Task | File to Read |
|------|--|
| "How do I push code?" | GITHUB_QUICK_START.md |
| "What files are included?" | FILE_INVENTORY.md (this file) |
| "How do I deploy?" | DEPLOYMENT.md |
| "How do I set up database?" | SETUP_GUIDE.md |
| "How do I use this project?" | README.md |

---

**You're ready! Start with `GITHUB_QUICK_START.md`**
