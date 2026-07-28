# Cable&Net Courses — LMS Platform

A lightweight, standards-based learning management system for data cabling and networking courses. Built with vanilla JavaScript, Supabase, and a custom design system rooted in T568B cable-pair colors.

**Live Site:** `[Your GitHub Pages URL]`

---

## Project Structure

```
cable-net-courses/
├── index-dynamic.html          # Home page with courses
├── login.html                  # Shared login/signup
├── pending.html                # Approval pending page
├── student-dashboard.html      # Student view
├── instructor-dashboard.html   # Admin control panel
├── css/
│   └── style.css               # Design system (T568B theme)
├── js/
│   ├── config.js               # 🔑 Supabase credentials (update locally)
│   ├── supabase-client.js      # Supabase initialization
│   ├── auth-form.js            # Login/signup logic
│   └── load-courses.js         # Course rendering
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── SETUP_GUIDE.md              # Detailed setup instructions
```

---

## Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/cable-net-courses.git
cd cable-net-courses
```

### 2. Add Your Supabase Credentials
**Only do this locally — never commit real credentials to GitHub.**

Open `js/config.js` and replace the placeholder values:

```javascript
window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  key: 'YOUR-ANON-KEY-HERE'
};
```

Get these from: [Supabase Dashboard](https://supabase.com) → Settings → API

### 3. Set Up Supabase Database

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'admin')),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_num INT,
  title TEXT,
  description TEXT,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT now()
);

-- Insert sample courses
INSERT INTO courses (course_num, title, description) VALUES
(1, 'Network Foundations', 'Cabling & Infrastructure'),
(2, 'Network Operations', 'Configuration & Troubleshooting');

-- Enable Row Level Security (optional but recommended)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
```

### 4. Test Locally

Serve the project with a local server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js (if installed)
npx http-server
```

Then visit `http://localhost:8000`

---

## Authentication Flow

### Role-Based Login (Option A)

**Single login form serves both students and admins:**

```
Sign In
  ↓
Check role in database
  ├─ role='admin' → /instructor-dashboard.html
  ├─ role='student' + approved=true → /student-dashboard.html
  └─ role='student' + approved=false → /pending.html
```

**Create Account:**
- New accounts are created with `role='student'` and `approved=false`
- Admin must approve in Supabase console or admin dashboard
- Student sees approval-pending page until approved

---

## Deploying to GitHub Pages

### Option 1: Simple Static Hosting (Easiest)

1. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: Deploy from branch → `main` (or `master`)
   - Save

2. **Update your config.js before pushing:**
   - ⚠️ **Important:** Only commit `js/config.js` with placeholder values
   - Your actual credentials stay local

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

4. Your site will be live at: `https://YOUR-USERNAME.github.io/cable-net-courses`

### Option 2: Environment Variables (Recommended for Security)

If deploying with a CI/CD service (Vercel, Netlify, GitHub Actions):

1. **Create `js/config.js` build script:**
   ```bash
   # During build time, inject environment variables
   echo "window.SUPABASE_CONFIG = {" > js/config.js
   echo "  url: '$VITE_SUPABASE_URL'," >> js/config.js
   echo "  key: '$VITE_SUPABASE_ANON_KEY'" >> js/config.js
   echo "};" >> js/config.js
   ```

2. **Add secrets to your hosting platform:**
   - GitHub Actions / Secrets
   - Vercel / Environment Variables
   - Netlify / Build Environment

See `DEPLOYMENT.md` for detailed CI/CD setup.

---

## Important Security Notes

### ✅ Safe to Commit to GitHub
- HTML files
- CSS (design system)
- JavaScript logic files (`auth-form.js`, `load-courses.js`)
- `.env.example` (template only)
- `README.md`, documentation

### ❌ Never Commit to GitHub
- `js/config.js` with real credentials
- `.env` files with secrets
- API keys, tokens, passwords
- Personal data

### How to Keep Secrets Safe

**Local Development:**
```javascript
// js/config.js (local only, never committed with real values)
window.SUPABASE_CONFIG = {
  url: 'https://real-project.supabase.co',  // Your real URL
  key: 'eyJhbGc...'                         // Your real key
};
```

**Before committing:**
```bash
# Restore placeholder version
git checkout js/config.js

# Verify it's safe
cat js/config.js
# Should show: 'https://your-project.supabase.co'

git add .
git commit -m "Update features"
git push
```

---

## File Structure Details

### HTML Pages
| File | Purpose | Auth Required |
|------|---------|---|
| `index-dynamic.html` | Home & course listing | No |
| `login.html` | Login/signup form | No |
| `pending.html` | Approval waiting page | Yes (but not approved) |
| `student-dashboard.html` | Student course access | Yes + approved |
| `instructor-dashboard.html` | Admin controls | Yes + admin role |

### JavaScript
| File | Purpose |
|------|---------|
| `config.js` | 🔑 Credentials (local use only) |
| `supabase-client.js` | Supabase SDK init |
| `auth-form.js` | Login/signup form handlers |
| `load-courses.js` | Fetch & render courses |

### CSS
| File | Purpose |
|------|---------|
| `style.css` | Complete design system |

---

## Development Workflow

### Daily Development
```bash
# 1. Start local server
python -m http.server 8000

# 2. Make changes to HTML/CSS/JS
# (Credentials in js/config.js are already set locally)

# 3. Test changes at http://localhost:8000

# 4. Before committing, restore placeholder config
git checkout js/config.js

# 5. Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

### Making Changes to `js/config.js`

```bash
# 1. Make your changes locally and test
# (Don't commit yet)

# 2. When ready to commit, restore the placeholder
git checkout js/config.js

# 3. Commit
git add . # (but NOT js/config.js with real credentials)
git commit -m "Your changes"

# 4. Restore your local version
# (manually re-add your credentials)
```

---

## Phase Development

### ✅ Phase 1: Home & Auth
- Home page with courses
- Login/signup with role-based redirect
- Approval system

### 🔄 Phase 2: Student Dashboard
- Enrolled courses list
- Module tracking
- Progress display

### 📋 Phase 3: Instructor Dashboard
- Student management (approve/reject)
- Manual & CSV enrollment
- Progress editing
- Analytics

---

## Troubleshooting

### "Login button doesn't work"
1. Check browser console (F12) for errors
2. Verify `js/config.js` has valid Supabase URL and key
3. Check that `config.js` is loaded before `supabase-client.js`

### "Can't load courses"
1. Verify `courses` table exists in Supabase
2. Insert sample data (see Quick Start section)
3. Check database permissions

### "Credentials showing in GitHub"
1. **Don't panic** — rotate your Supabase key immediately
2. Run: `git checkout js/config.js` to restore placeholder
3. Commit and push
4. In Supabase, go to Settings → API → Regenerate key

### "CORS errors when calling Supabase"
1. Check Supabase dashboard → Settings → API
2. Verify your GitHub Pages URL is in allowed origins
3. Or disable CORS checks (not recommended for production)

---

## Next Steps

1. **Read SETUP_GUIDE.md** for detailed database setup
2. **Create your GitHub repository** and push this code
3. **Set up GitHub Pages** for hosting
4. **Configure Supabase** with your database
5. **Test locally** with your credentials in `js/config.js`
6. **Deploy** and share the link!

---

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## License

Created for MITD networking courses. Built by Raj Babna.

---

## Support

For questions or issues:
1. Check `SETUP_GUIDE.md`
2. Review Supabase documentation
3. Check browser console for error messages
4. Review the auth flow in `js/auth-form.js`

**Last Updated:** July 2026
