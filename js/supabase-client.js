// Initialize Supabase client (vanilla JS)
// Credentials loaded from window.SUPABASE_CONFIG (set in config.js)

(function() {
  // Safely get config, with fallbacks
  var config = window.SUPABASE_CONFIG || {};
  var SUPABASE_URL = config.url || "https://your-project.supabase.co";
  var SUPABASE_ANON_KEY = config.key || "your-anon-key-here";

  // Validate credentials
  if (
    SUPABASE_URL.includes("your-project") ||
    SUPABASE_ANON_KEY.includes("your-anon-key")
  ) {
    console.error("⚠️ Supabase credentials not configured. Check js/config.js");
  }

  // Check if Supabase library loaded
  if (!window.supabase) {
    console.error(
      "❌ window.supabase is undefined! Supabase library failed to load."
    );
    throw new Error("Supabase library failed to load");
  }

  // Create the client
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
})();
