-- ─────────────────────────────────────────────────────────────
--  MIGRATION: Gallery storage bucket + policies
--
--  Run this in: Supabase → SQL Editor → Run
--
--  After running:
--  1. Go to Supabase → Storage → New bucket
--     Name: gallery   |   Public: ON   |   Create bucket
--  2. Create an admin user: Supabase → Authentication → Users
--     → Add user → enter your email + a password
--  3. Visit https://toranacreatives.in/?admin to sign in and upload
-- ─────────────────────────────────────────────────────────────

-- Allow anyone to read gallery files (public photos)
CREATE POLICY "public_read_gallery" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'gallery');

-- Allow authenticated admins to upload files
CREATE POLICY "admin_upload_gallery" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery');

-- Allow authenticated admins to delete files
CREATE POLICY "admin_delete_gallery" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery');

-- Allow authenticated admins to update files
CREATE POLICY "admin_update_gallery" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery');
