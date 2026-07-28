// Initialize Supabase client
// Credentials are loaded from environment variables or window object
// For local development: create .env.local with VITE_SUPABASE_* variables
// For GitHub Pages: set these in your hosting environment or config file

let SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL;
let SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// Fallback for non-Vite environments (vanilla JS)
if (!SUPABASE_URL) {
  SUPABASE_URL = window.SUPABASE_CONFIG?.url || 'https://your-project.supabase.co';
}
if (!SUPABASE_ANON_KEY) {
  SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.key || 'your-anon-key-here';
}

// Validate credentials are set
if (SUPABASE_URL.includes('your-project') || SUPABASE_ANON_KEY.includes('your-anon-key')) {
  console.error('⚠️ Supabase credentials not configured. Check js/config.js or environment variables.');
}

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
