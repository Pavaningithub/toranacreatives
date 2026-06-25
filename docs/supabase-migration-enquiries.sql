-- ─────────────────────────────────────────────────────────────
--  MIGRATION: Enquiries table
--
--  Run this in: Supabase → SQL Editor → Run
--  Safe to run multiple times (uses IF NOT EXISTS).
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS enquiries (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  email       TEXT,
  event_type  TEXT,
  event_date  DATE,
  location    TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created
  ON enquiries (created_at DESC);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an enquiry
CREATE POLICY "anon_insert_enquiry" ON enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Only authenticated admins can view enquiries
CREATE POLICY "admin_view_enquiries" ON enquiries
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_manage_enquiries" ON enquiries
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
