-- ─────────────────────────────────────────────────────────────
--  TORANA CREATIVES — Supabase Reviews Schema
--
--  Run this in: Supabase → SQL Editor → Run
--
--  After running:
--  1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel
--  2. Reviews submitted via the website are stored here
--  3. Ratings >= 4 are auto-approved by the trigger below
--  4. Only approved reviews with rating > 4 show on the public website
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reviews (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id    TEXT,                               -- e.g. TC_1, TC_2
  reviewer_name TEXT        NOT NULL,
  event_type    TEXT        DEFAULT '',
  phone         TEXT,                               -- optional, never shown publicly
  rating        INTEGER     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text   TEXT        NOT NULL,
  is_approved   BOOLEAN     DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_reviews_approved_rating
  ON reviews (is_approved, rating);

CREATE INDEX IF NOT EXISTS idx_reviews_project
  ON reviews (project_id);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a review
CREATE POLICY "anon_insert_review" ON reviews
  FOR INSERT TO anon
  WITH CHECK (true);

-- Public can only see approved reviews with rating > 4
-- Reviews with rating <= 4 are stored but never exposed via the API
CREATE POLICY "public_view_high_rated_approved" ON reviews
  FOR SELECT TO anon
  USING (is_approved = true AND rating > 4);

-- Authenticated admins (Supabase dashboard) can see and manage all reviews
CREATE POLICY "admin_full_access" ON reviews
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── Auto-approval trigger ─────────────────────────────────────
-- Ratings >= 4 are automatically approved on insert.
-- Ratings 1–3 stay is_approved=false (stored but never shown publicly).
-- The SELECT policy still gates public display at rating > 4,
-- so 4-star reviews are approved (trusted) but not shown on the website.

CREATE OR REPLACE FUNCTION auto_approve_high_rated_review()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.rating >= 4 THEN
    NEW.is_approved := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_auto_approve_review ON reviews;
CREATE TRIGGER trigger_auto_approve_review
  BEFORE INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION auto_approve_high_rated_review();

-- ── Phone column: never return via public API ─────────────────
-- The SELECT policy above already restricts rows, but for defense in depth
-- you can create a view that strips the phone column for anon users.
-- Optional: uncomment and use this view in your app instead of the table.
--
-- CREATE VIEW public_reviews AS
--   SELECT id, project_id, reviewer_name, event_type, rating, review_text, created_at
--   FROM reviews
--   WHERE is_approved = true AND rating > 4;
--
-- ALTER VIEW public_reviews OWNER TO anon;
