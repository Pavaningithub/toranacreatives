-- ─────────────────────────────────────────────────────────────
--  MIGRATION: Gallery captions table + Storage bucket setup
--
--  Run this in: Supabase → SQL Editor → Run
--
--  After running:
--  1. Go to Supabase → Storage → New bucket
--     Name: gallery   |   Public: ON   |   Create bucket
--  2. Upload any images or videos — they appear on the website instantly
--  3. To add a caption: Table Editor → gallery_captions → Insert row
--     path: exact filename (e.g. "shashi_engagement.jpg")
--     caption: "Shashi's Engagement at Subramanya Matt"
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gallery_captions (
  path        TEXT        PRIMARY KEY,   -- exact filename in storage bucket
  caption     TEXT        NOT NULL,
  is_visible  BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_captions ENABLE ROW LEVEL SECURITY;

-- Anyone can read captions (they're public photo descriptions)
CREATE POLICY "public_read_captions" ON gallery_captions
  FOR SELECT TO anon
  USING (is_visible = true);

-- Only authenticated admins can add/edit captions
CREATE POLICY "admin_manage_captions" ON gallery_captions
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
