import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/launch";

// supabase is null when env vars are not configured (dev without Supabase, or missing vars).
// Components must guard with: if (!supabase) { /* fallback */ }
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
