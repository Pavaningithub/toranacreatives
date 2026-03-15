// ============================================================
//  TORANA (ತೋರಣ) CREATIVES — SITE CONFIGURATION
//
//  ⚠️  WHATSAPP & EMAIL are intentionally NOT stored here.
//      They live in  .env  (gitignored). See .env.example.
//      Set VITE_WA and VITE_EMAIL in Vercel → Settings → Env Vars.
// ============================================================

// Read from Vercel/environment — falls back to .env locally.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WA    || "919731874874";
export const CONTACT_EMAIL   = import.meta.env.VITE_EMAIL || "toranacreatives5@gmail.com";
export const LOCATION        = "Bengaluru, Karnataka";

// ── Social Media ────────────────────────────────────────────
export const INSTAGRAM_HANDLE  = "torana_creatives";          // ← your IG handle (no @)
export const FACEBOOK_PAGE     = "";                           // ← paste your FB page name/ID once created
export const FACEBOOK_ENABLED  = false;                        // ← flip to true once FB page is live

// ── Stats Strip (Hero + About) ───────────────────────────────
// Set VITE_STATS_ENABLED=true in Vercel env vars to show the stats strip.
// Set each count via its own env var.  Defaults to 0 (hidden).
export const STATS_ENABLED    = import.meta.env.VITE_STATS_ENABLED === "true";
export const EVENTS_COUNT     = Number(import.meta.env.VITE_EVENTS_COUNT)  || 0;
export const YEARS_COUNT      = Number(import.meta.env.VITE_YEARS_COUNT)   || 0;
export const RITUALS_COUNT    = Number(import.meta.env.VITE_RITUALS_COUNT) || 0;
export const FAMILIES_COUNT   = Number(import.meta.env.VITE_FAMILIES_COUNT)|| 0;
