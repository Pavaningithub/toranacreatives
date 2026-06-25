// ============================================================
//  TORANA (ತೋರಣ) CREATIVES — SITE CONFIGURATION
//
//  ⚠️  ALL contact details, API keys, and PII live in .env
//      (gitignored locally) and Vercel → Settings → Env Vars.
//      NEVER add real values directly in this file.
//      See .env.example for the full list of required vars.
// ============================================================

// Contact — must be set in Vercel ENV (never committed here)
export const WHATSAPP_NUMBER = import.meta.env.VITE_WA    || "";
export const CONTACT_EMAIL   = import.meta.env.VITE_EMAIL || "";
export const LOCATION        = "Bengaluru, Karnataka";

// ── Social Media ────────────────────────────────────────────
export const INSTAGRAM_HANDLE  = import.meta.env.VITE_IG_HANDLE  || "torana_creatives";
export const FACEBOOK_PAGE     = import.meta.env.VITE_FB_PAGE    || "";
export const FACEBOOK_ENABLED  = import.meta.env.VITE_FB_ENABLED === "true";

// ── Instagram Feed (Behold.so widget) ───────────────────────
// Sign up at behold.so, connect your Instagram Business account,
// create a feed widget, and paste the Feed ID here via Vercel env.
export const BEHOLD_FEED_ID    = import.meta.env.VITE_BEHOLD_FEED_ID || "";

// ── Stats Strip (Hero + About) ───────────────────────────────
export const STATS_ENABLED    = import.meta.env.VITE_STATS_ENABLED === "true";
export const EVENTS_COUNT     = Number(import.meta.env.VITE_EVENTS_COUNT)  || 0;
export const YEARS_COUNT      = Number(import.meta.env.VITE_YEARS_COUNT)   || 0;
export const RITUALS_COUNT    = Number(import.meta.env.VITE_RITUALS_COUNT) || 0;
export const FAMILIES_COUNT   = Number(import.meta.env.VITE_FAMILIES_COUNT)|| 0;

// ── Supabase (reviews DB) ────────────────────────────────────
// Create a free project at supabase.com, run the SQL schema from
// docs/supabase-schema.sql, then set these in Vercel env vars.
export const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL      || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// ── Project Tracking ─────────────────────────────────────────
// Send feedback URLs to customers: https://toranacreatives.in/?feedback=TC_1
// Projects are managed in src/components/Projects.jsx
export const PROJECT_PREFIX    = "TC_";
