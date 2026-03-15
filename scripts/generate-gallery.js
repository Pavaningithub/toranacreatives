#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
//  Gallery Manifest Generator
//  Scans public/gallery/ and writes public/gallery/manifest.json
//
//  Usage:
//    npm run gallery
//
//  The manifest is gitignored so it never clutters the repo.
//  GitHub Actions regenerates it fresh on every deploy.
//
//  To add a label or category to a file, create a sidecar JSON:
//    public/gallery/wedding-01.jpg        ← the media file
//    public/gallery/wedding-01.jpg.json   ← optional metadata
//    { "label": "Mandap Ceremony", "category": "Wedding" }
// ─────────────────────────────────────────────────────────────

import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const GALLERY_DIR = join(__dirname, "..", "public", "gallery");
const MANIFEST    = join(GALLERY_DIR, "manifest.json");

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov"];
const SKIP      = ["manifest.json", ".gitkeep"];

const files = readdirSync(GALLERY_DIR)
  .filter((f) => {
    if (SKIP.includes(f)) return false;
    if (f.endsWith(".json")) return false;           // sidecar files
    const ext = extname(f).toLowerCase();
    return IMAGE_EXT.includes(ext) || VIDEO_EXT.includes(ext);
  })
  .sort();                                            // consistent order

const items = files.map((filename, index) => {
  const ext      = extname(filename).toLowerCase();
  const type     = VIDEO_EXT.includes(ext) ? "video" : "image";
  const sidecar  = join(GALLERY_DIR, filename + ".json");
  const meta     = existsSync(sidecar)
    ? JSON.parse(readFileSync(sidecar, "utf-8"))
    : {};

  return {
    id:       index + 1,
    filename,
    url:      `/gallery/${filename}`,
    type,
    label:    meta.label    ?? basename(filename, extname(filename)).replace(/[-_]/g, " "),
    category: meta.category ?? null,
    alt:      meta.alt      ?? `Torana Creatives event photo — ${basename(filename, extname(filename))}`,
  };
});

writeFileSync(MANIFEST, JSON.stringify(items, null, 2), "utf-8");
console.log(`✅  Gallery manifest written — ${items.length} item(s)`);
items.forEach((i) => console.log(`   [${i.type}] ${i.filename}  →  ${i.label}`));
