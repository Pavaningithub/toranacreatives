// ============================================================
//  TORANA (ತೋರಣ) CREATIVES — LAUNCH CONFIGURATION
//  Edit LAUNCH_DATETIME to set your exact pooja-completion time.
//  Format: ISO 8601  →  "YYYY-MM-DDTHH:MM:SS"  (local time)
//
//  ⚠️  WHATSAPP & EMAIL are intentionally NOT stored here.
//      They live in  .env  (gitignored). See .env.example.
// ============================================================

export const LAUNCH_DATETIME = "2026-03-08T19:30:00"; // ← Change this!

// Read from Vercel/environment — falls back to .env locally.
// Set VITE_WA and VITE_EMAIL in your Vercel project dashboard under Settings → Environment Variables.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WA    || "919731874874";
export const CONTACT_EMAIL   = import.meta.env.VITE_EMAIL || "torana.creatives.5@gmail.com";

export const LOCATION = "Bengaluru, Karnataka";
