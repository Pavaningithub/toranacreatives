-- ─────────────────────────────────────────────────────────────
--  MIGRATION: gallery_items table
--
--  Run this in: Supabase → SQL Editor → Run
--
--  This replaces the gallery_captions table approach.
--  Images uploaded via the admin page are tracked here.
--  The public website reads from this table — no storage RLS needed.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gallery_items (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  path       TEXT        NOT NULL UNIQUE,
  caption    TEXT,
  is_visible BOOLEAN     DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Public can read visible items
CREATE POLICY "public_read_gallery_items" ON gallery_items
  FOR SELECT TO anon
  USING (is_visible = true);

-- Authenticated admins can manage all items
CREATE POLICY "admin_manage_gallery_items" ON gallery_items
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_gallery_items_created
  ON gallery_items (created_at DESC);
