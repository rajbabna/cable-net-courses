# Copy These Files to GitHub

**Complete list of files to upload. Copy-paste ready.**

---

## Your Local Folder Structure

Before pushing to GitHub, organize your files like this:

```
cable-net-courses/                    ← Your project folder
│
├── .gitignore                        ← Create this
├── .env.example                      ← Create this
│
├── GETTING_STARTED.md                ← Copy from outputs
├── GITHUB_QUICK_START.md             ← Copy from outputs
├── README.md                         ← Copy from outputs
├── SETUP_GUIDE.md                    ← Copy from outputs
├── DEPLOYMENT.md                     ← Copy from outputs
├── FILE_INVENTORY.md                 ← Copy from outputs
│
├── index-dynamic.html                ← Copy from outputs
├── login.html                        ← Copy from outputs
├── pending.html                      ← Copy from outputs
├── student-dashboard.html            ← Copy from outputs
├── instructor-dashboard.html         ← Copy from outputs
│
├── css/                              ← Create this folder
│   └── style.css                     ← Copy from outputs
│
└── js/                               ← Create this folder
    ├── config.js                     ← Copy from outputs
    ├── supabase-client.js            ← Copy from outputs
    ├── auth-form.js                  ← Copy from outputs
    └── load-courses.js               ← Copy from outputs
```

---

## Copy Instructions

### Step 1: Create Folders

```bash
# On your machine, create project folder
mkdir cable-net-courses
cd cable-net-courses

# Create subfolders
mkdir css
mkdir js
```

### Step 2: Copy All Files

Copy each file listed below from the outputs folder to your local `cable-net-courses/` folder:

**Root level files:**
- `.gitignore`
- `.env.example`
- `GETTING_STARTED.md`
- `GITHUB_QUICK_START.md`
- `README.md`
- `SETUP_GUIDE.md`
- `DEPLOYMENT.md`
- `FILE_INVENTORY.md`

**HTML files (root):**
- `index-dynamic.html`
- `login.html`
- `pending.html`
- `student-dashboard.html`
- `instructor-dashboard.html`

**CSS folder:**
- `css/style.css`

**JS folder:**
- `js/config.js`
- `js/supabase-client.js`
- `js/auth-form.js`
- `js/load-courses.js`

### Step 3: Your Folder Now Looks Like

```bash
cable-net-courses/
├── .gitignore
├── .env.example
├── GETTING_STARTED.md
├── GITHUB_QUICK_START.md
├── README.md
├── SETUP_GUIDE.md
├── DEPLOYMENT.md
├── FILE_INVENTORY.md
├── index-dynamic.html
├── login.html
├── pending.html
├── student-dashboard.html
├── instructor-dashboard.html
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── supabase-client.js
    ├── auth-form.js
    └── load-courses.js
```

---

## File Contents Reference

### `.gitignore`
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

### `.env.example`
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### HTML Files
All HTML files:
- Link to `css/style.css`
- Load Supabase SDK from CDN
- Load `js/config.js` first (for credentials)
- Load other JS files after

Example script order in HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script src="js/config.js"></script>
<script src="js/supabase-client.js"></script>
<script src="js/auth-form.js"></script>
```

### CSS File
- T568B cable color theme
- Responsive design
- No external dependencies
- Ready to use

### JavaScript Files
- `config.js` — Supabase credentials (update locally only)
- `supabase-client.js` — Initializes Supabase SDK
- `auth-form.js` — Login/signup form logic
- `load-courses.js` — Loads courses from database

---

## After Copying: Add Your Credentials

**Local machine only:**

1. Open `js/config.js`
2. Replace placeholder values:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://YOUR-PROJECT.supabase.co',
     key: 'YOUR-ANON-KEY'
   };
   ```
3. Save (don't commit this version)

---

## Git Commands to Push

Once files are organized:

```bash
# Navigate to your project
cd cable-net-courses

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial Cable&Net Courses setup"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git
git branch -M main
git push -u origin main
```

---

## Verification Checklist

After copying, verify:

```bash
# Check that all files exist
ls -la cable-net-courses/
ls -la cable-net-courses/css/
ls -la cable-net-courses/js/

# Should show all files listed above

# Verify .gitignore is present
cat cable-net-courses/.gitignore

# Verify config.js has placeholder values
cat cable-net-courses/js/config.js
# Should show 'your-project.supabase.co' and 'your-anon-key-here'
```

---

## File Sizes

For reference (all small):

```
.gitignore               ~0.2 KB
.env.example             ~0.2 KB
GETTING_STARTED.md       ~10 KB
README.md                ~12 KB
SETUP_GUIDE.md           ~8 KB
DEPLOYMENT.md            ~9 KB
FILE_INVENTORY.md        ~7 KB
GITHUB_QUICK_START.md    ~4 KB

index-dynamic.html       ~2.5 KB
login.html               ~2 KB
pending.html             ~1.5 KB
student-dashboard.html   ~2 KB
instructor-dashboard.html ~2 KB

css/style.css            ~7.8 KB

js/config.js             ~0.5 KB
js/supabase-client.js    ~0.8 KB
js/auth-form.js          ~2.5 KB
js/load-courses.js       ~1 KB

Total: ~97 KB
```

---

## On Windows (If Copying via GUI)

1. Create folder: `cable-net-courses`
2. Create subfolders: `css`, `js`
3. Drag-and-drop files from outputs folder:
   - `.gitignore` → root
   - `.env.example` → root
   - All `.md` files → root
   - All `.html` files → root
   - `style.css` → `css/` folder
   - All `.js` files → `js/` folder

4. Right-click folder → Open terminal here
5. Run git commands:
   ```
   git init
   git add .
   git commit -m "Initial setup"
   git remote add origin [GitHub URL]
   git push -u origin main
   ```

---

## On macOS/Linux (Command Line)

```bash
# Create and organize
mkdir cable-net-courses
cd cable-net-courses
mkdir css js

# Copy files from outputs to your folders
# Assuming outputs are in ~/Downloads/outputs/

cp ~/Downloads/outputs/.gitignore .
cp ~/Downloads/outputs/.env.example .
cp ~/Downloads/outputs/*.md .
cp ~/Downloads/outputs/*.html .
cp ~/Downloads/outputs/css/style.css css/
cp ~/Downloads/outputs/js/*.js js/

# Verify
ls -la
ls -la css/
ls -la js/

# Continue with git setup
git init
git add .
git commit -m "Initial Cable&Net Courses setup"
git remote add origin https://github.com/YOUR-USERNAME/cable-net-courses.git
git push -u origin main
```

---

## Quick Sanity Checks

After copying, before pushing to GitHub:

### Check 1: HTML Links Are Correct
```bash
# Open any HTML file and look for:
<link rel="stylesheet" href="css/style.css">     ✅ Correct
<script src="js/supabase-client.js"></script>    ✅ Correct

# NOT:
<link rel="stylesheet" href="style.css">         ❌ Wrong path
<script src="supabase-client.js"></script>       ❌ Wrong path
```

### Check 2: Config.js Has Placeholder
```bash
cat js/config.js

# Should show:
window.SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co',      ✅ Placeholder
  key: 'your-anon-key-here'                      ✅ Placeholder
};

# NOT:
window.SUPABASE_CONFIG = {
  url: 'https://abcd1234.supabase.co',          ❌ Real URL!
  key: 'eyJhbGci...'                             ❌ Real key!
};
```

### Check 3: .gitignore Exists
```bash
test -f .gitignore && echo "✅ .gitignore found" || echo "❌ Missing"
```

### Check 4: All Files Present
```bash
# Should exist:
test -f index-dynamic.html && echo "✅ index"
test -f login.html && echo "✅ login"
test -f css/style.css && echo "✅ css"
test -f js/config.js && echo "✅ config"
test -f README.md && echo "✅ README"
```

---

## Troubleshooting: "File Not Found"

If you get "file not found" when pushing:

```bash
# Check what git thinks is in the repository
git ls-files

# Should show all your files
# If not, add them:
git add .
git status

# Check for unstaged files
git diff --name-only
```

---

## Next Step

Once you've copied all files and verified they're in place:

1. **Initialize git** (if you haven't):
   ```bash
   cd cable-net-courses
   git init
   ```

2. **Read:** `GITHUB_QUICK_START.md`
   - Create GitHub repository
   - Push your code
   - Enable GitHub Pages

3. **Test locally:**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

---

## Files You Should NOT Copy

❌ Delete these if you have them locally:
- `node_modules/` (if you added npm)
- `.git/` (git manages this)
- `dist/` or `build/` (generated files)
- Any `.log` files
- `.DS_Store` (macOS)
- `Thumbs.db` (Windows)

---

## Summary

| Task | Action |
|------|--------|
| Create folders | `mkdir css js` |
| Copy files | Copy all files listed above |
| Add credentials | Edit `js/config.js` (local only) |
| Verify setup | Run checks above |
| Push to GitHub | Follow `GITHUB_QUICK_START.md` |

---

**Once organized, go to `GITHUB_QUICK_START.md` for the rest!**
