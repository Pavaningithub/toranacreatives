#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
//  Google Drive → Gallery Sync
//
//  Downloads photos from a shared Google Drive folder into
//  public/gallery/. File names must include the project ID:
//    TC_1_wedding_entrance.jpg
//    TC_2_gruhapravesha_rangoli.jpg
//  These become gallery categories automatically.
//
//  Run locally:  npm run gallery:drive
//  In CI:        GitHub Actions runs this before npm run gallery
//
//  Required env vars (set in Vercel + GitHub Secrets):
//    GOOGLE_DRIVE_FOLDER_ID
//    GOOGLE_SERVICE_ACCOUNT_JSON   ← full JSON as a string
// ─────────────────────────────────────────────────────────────

import { google } from "googleapis";
import { createWriteStream, mkdirSync, writeFileSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const GALLERY_DIR = join(__dirname, "..", "public", "gallery");

const FOLDER_ID  = process.env.GOOGLE_DRIVE_FOLDER_ID;
const SA_JSON    = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!FOLDER_ID || !SA_JSON) {
  console.error("❌  Missing GOOGLE_DRIVE_FOLDER_ID or GOOGLE_SERVICE_ACCOUNT_JSON env vars.");
  process.exit(1);
}

const IMAGE_MIME = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/avif",
];
const VIDEO_MIME = [
  "video/mp4", "video/webm", "video/quicktime",
];

// Extract TC_N prefix from filename: "TC_1_my_photo.jpg" → "TC_1"
function extractProjectId(filename) {
  const m = filename.match(/^(TC_\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

// Human-readable label from filename: "TC_1_wedding_entrance.jpg" → "Wedding Entrance"
function labelFromFilename(filename) {
  return filename
    .replace(/^TC_\d+_?/i, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function sync() {
  console.log("🔄  Starting Google Drive → Gallery sync…");
  mkdirSync(GALLERY_DIR, { recursive: true });

  const credentials = JSON.parse(SA_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  let files = [];
  let pageToken = null;

  do {
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
      pageSize: 100,
      pageToken: pageToken || undefined,
    });
    files = files.concat(res.data.files || []);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  const media = files.filter((f) =>
    IMAGE_MIME.includes(f.mimeType) || VIDEO_MIME.includes(f.mimeType)
  );

  console.log(`📁  Found ${media.length} media file(s) in Drive folder.`);

  for (const file of media) {
    const destPath = join(GALLERY_DIR, file.name);
    const sidecarPath = destPath + ".json";
    const projectId = extractProjectId(file.name);
    const label = labelFromFilename(file.name);

    console.log(`   ⬇  ${file.name}${projectId ? ` [${projectId}]` : ""}`);

    const res = await drive.files.get(
      { fileId: file.id, alt: "media" },
      { responseType: "stream" }
    );
    await pipeline(res.data, createWriteStream(destPath));

    const sidecar = { label, category: projectId ?? undefined };
    writeFileSync(sidecarPath, JSON.stringify(sidecar, null, 2));
  }

  console.log(`✅  Sync complete — ${media.length} file(s) downloaded to public/gallery/`);
  console.log("   Now run: npm run gallery   (to regenerate manifest.json)");
}

sync().catch((err) => {
  console.error("❌  Sync failed:", err.message);
  process.exit(1);
});
