# Cable&Net Courses — Authentication Setup Guide

## Overview
This implements **Option A: Shared Login with Role-Based Redirect**. A single login form handles both students and admins, with automatic redirect based on user role and approval status.

## Files Created

### JavaScript
- **`js/supabase-client.js`** — Supabase client initialization
- **`js/auth-form.js`** — Login/signup form with tab switching and auth logic
- **`js/load-courses.js`** — Dynamically loads and renders courses

### Pages
- **`student-dashboard.html`** — Student view (Phase 2 dashboard)
- **`instructor-dashboard.html`** — Admin/instructor control panel
- **`login.html`** — Shared login/signup (updated)
- **`pending.html`** — Approval pending page (updated)
- **`index-dynamic.html`** — Home page with courses (updated)

---

## Configuration Required

### 1. Update Supabase Credentials
Edit **`js/supabase-client.js`** and replace with your actual project credentials:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

Get these from your Supabase dashboard: Settings → API → Project URL & anon key

### 2. Create Supabase Tables

Your database needs these tables (already defined in your Phase 2 work):

#### `profiles` table
```
id (UUID, PK, FK to auth.users)
email (TEXT)
full_name (TEXT)
role (TEXT) — 'student' or 'admin'
approved (BOOLEAN) — true for students who can access courses
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### `courses` table
```
id (UUID, PK)
course_num (INT) — 1, 2, 3, etc.
title (TEXT)
description (TEXT)
status (TEXT) — 'Available', 'Coming Soon', etc.
created_at (TIMESTAMP)
```

Insert sample courses:
```sql
INSERT INTO courses (course_num, title, description, status) VALUES
(1, 'Network Foundations', 'Cabling & Infrastructure', 'Available'),
(2, 'Network Operations', 'Configuration & Troubleshooting', 'Available');
```

#### `enrollments` table (Phase 2)
```
id (UUID, PK)
user_id (UUID, FK to profiles.id)
course_id (UUID, FK to courses.id)
enrolled_at (TIMESTAMP)
progress (INT) — 0-100
```

---

## Auth Flow (Option A: Shared Login)

### Login Process
1. User enters email + password in login form
2. `auth-form.js` calls `supabaseClient.auth.signInWithPassword()`
3. After successful auth, fetch user's `profiles` record
4. **Check role + approved status:**
   - `role='admin'` → redirect to `/instructor-dashboard.html`
   - `role='student'` + `approved=true` → redirect to `/student-dashboard.html`
   - `role='student'` + `approved=false` → redirect to `/pending.html`

### Signup Process
1. User enters name + email + password
2. `auth-form.js` calls `supabaseClient.auth.signUp()`
3. Creates new `profiles` record with:
   - `role='student'`
   - `approved=false` (awaiting admin approval)
4. Redirects to `/pending.html`
5. Student receives confirmation email from Supabase

### Security Checks
Each protected page verifies:
- User is authenticated (`getSession()`)
- User has correct role for that page
- For students: `approved=true`

If check fails, user is redirected to appropriate page.

---

## Tab Switching (Login/Create Account)

The `.form-toggle` buttons now work:
- Click **Log in** → shows signin form
- Click **Create account** → shows signup form
- Tab switching clears previous error messages

---

## Required Environment

### File Structure
```
.
├── index-dynamic.html
├── login.html
├── pending.html
├── student-dashboard.html
├── instructor-dashboard.html
├── css/
│   └── style.css
├── js/
│   ├── supabase-client.js ⚠️ UPDATE WITH YOUR CREDENTIALS
│   ├── auth-form.js
│   └── load-courses.js
└── SETUP_GUIDE.md (this file)
```

### Browser Requirements
- Modern browser with ES6 support
- Supabase JS SDK (loaded via CDN in HTML)

---

## Testing Checklist

1. ✅ **Update credentials** in `supabase-client.js`
2. ✅ **Create database tables** in Supabase
3. ✅ **Test signup:**
   - Fill create account form
   - Should redirect to `/pending.html`
   - Email should receive confirmation link
4. ✅ **Test login (pending student):**
   - Login with newly created account
   - Should redirect to `/pending.html`
5. ✅ **Test login (approved student):**
   - Use Supabase console to set `profiles.approved=true`
   - Login again
   - Should redirect to `/student-dashboard.html`
6. ✅ **Test admin login:**
   - Create admin account via Supabase console
   - Set `role='admin'` in profiles
   - Login should redirect to `/instructor-dashboard.html`
7. ✅ **Test role-based access:**
   - Try accessing admin dashboard as student (should redirect)
   - Try accessing student dashboard as admin (should redirect)

---

## Next Steps (Phase 3)

1. **Instructor Dashboard (Full)**
   - Pending student list with approve/reject buttons
   - Manual enrollment form
   - CSV bulk enrollment
   - Progress editing UI

2. **Student Dashboard (Expanded)**
   - Course modules list
   - Progress tracking
   - Video/content player

3. **Admin Controls**
   - User management
   - Course management
   - Analytics

---

## Troubleshooting

### "Buttons don't work"
- Check browser console for errors
- Verify `supabase-client.js` has valid credentials
- Make sure `js/` folder is in correct location

### "Can't load courses"
- Verify `courses` table exists in Supabase
- Check that at least one course record is inserted
- Check browser console for API errors

### "Tab switching not working"
- Verify `.form-toggle` class is in login.html
- Check that button IDs match (`#tab-signin`, `#tab-signup`)
- Verify `js/auth-form.js` is loaded after HTML

### "Role-based redirect not working"
- Verify `profiles` table has `role` and `approved` columns
- Check that user has a profile record after signup
- Verify profile data is correct in Supabase console

---

## Questions?

Refer to Supabase docs: https://supabase.com/docs
