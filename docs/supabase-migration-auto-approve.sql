-- ─────────────────────────────────────────────────────────────
--  MIGRATION: Auto-approve reviews with rating >= 4
--
--  Run this in: Supabase → SQL Editor → Run
--  Safe to run multiple times (uses OR REPLACE / DROP IF EXISTS).
-- ─────────────────────────────────────────────────────────────

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
