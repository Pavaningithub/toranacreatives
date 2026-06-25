import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

const BUCKET = "gallery";
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 30;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
const MAX_VIDEO_BYTES = MAX_VIDEO_MB * 1024 * 1024;

// ─────────────────────────────────────────────────────────────
//  ADMIN UPLOAD PAGE
//  Access: https://toranacreatives.in/?admin
//  Login with the email + password you set in Supabase Auth.
// ─────────────────────────────────────────────────────────────

// ── Login ─────────────────────────────────────────────────────

function LoginForm({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    else onLogin();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg,#0a0000 0%,#280000 60%,#0a0000 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-2xl gold-gradient-text tracking-widest mb-1">Torana</div>
          <div className="font-kannada text-gold-light text-base">ತೋರಣ Creatives</div>
          <p className="text-cream/40 font-sans text-xs mt-3 tracking-widest uppercase">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <h2 className="font-serif text-xl text-gold-light text-center mb-2">Sign In</h2>

          <div>
            <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl px-4 py-3 font-sans text-sm border border-gold/20 placeholder:text-cream/25 focus:outline-none focus:border-gold/55 focus:ring-2 focus:ring-gold/15 transition-all"
              style={{ background: "rgba(255,255,255,0.08)", color: "#FFFDD0", WebkitTextFillColor: "#FFFDD0" }} />
          </div>

          <div>
            <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 font-sans text-sm border border-gold/20 placeholder:text-cream/25 focus:outline-none focus:border-gold/55 focus:ring-2 focus:ring-gold/15 transition-all"
              style={{ background: "rgba(255,255,255,0.08)", color: "#FFFDD0", WebkitTextFillColor: "#FFFDD0" }} />
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 font-sans font-bold text-sm tracking-wider uppercase rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Upload card ───────────────────────────────────────────────

function FilePreview({ file, caption, onCaption, onRemove, uploading, progress, done, error }) {
  const url = URL.createObjectURL(file);
  const isVideo = file.type.startsWith("video/");

  return (
    <div className="rounded-xl overflow-hidden border border-gold/20 bg-white/4">
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {isVideo
          ? <video src={url} className="w-full h-full object-cover" muted playsInline />
          : <img src={url} alt="" className="w-full h-full object-cover" />}
        {!uploading && !done && (
          <button onClick={onRemove}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-lg leading-none hover:bg-red-700 transition-colors">
            ×
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <div className="w-3/4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-white text-xs font-sans">{progress}%</p>
          </div>
        )}
        {done && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <p className="text-cream/50 font-mono text-[10px] truncate">{file.name}</p>
        <input
          type="text"
          value={caption}
          onChange={(e) => onCaption(e.target.value)}
          placeholder="Caption (optional) — shown on hover"
          disabled={uploading || done}
          className="w-full rounded-lg px-3 py-2 font-sans text-xs bg-white/8 border border-gold/15 text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/40 transition-all disabled:opacity-40"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    </div>
  );
}

// ── Existing gallery item ─────────────────────────────────────

function GalleryItem({ item, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await supabase.storage.from(BUCKET).remove([item.name]);
    await supabase.from("gallery_items").delete().eq("path", item.name);
    onDelete(item.name);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 group" style={{ aspectRatio: "4/3" }}>
      {item.isVideo
        ? <video src={item.url} className="w-full h-full object-cover" muted playsInline />
        : <img src={item.url} alt={item.caption || ""} className="w-full h-full object-cover" />}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <p className="text-white/80 font-sans text-xs text-center px-2 truncate max-w-full">{item.caption || item.name}</p>
        {!confirm
          ? <button onClick={() => setConfirm(true)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold font-sans bg-red-700/80 text-white hover:bg-red-600 transition-colors">
              Delete
            </button>
          : <div className="flex gap-2">
              <button onClick={handleDelete} disabled={deleting}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white disabled:opacity-50">
                {deleting ? "…" : "Confirm"}
              </button>
              <button onClick={() => setConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/20 text-white">
                Cancel
              </button>
            </div>}
      </div>
    </div>
  );
}

// ── Main admin dashboard ──────────────────────────────────────

function AdminDashboard({ onLogout }) {
  const [selected, setSelected]   = useState([]); // { file, caption, uploading, progress, done, error }
  const [existing, setExisting]   = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [dragOver, setDragOver]   = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { loadExisting(); }, []);

  async function loadExisting() {
    setLoadingGallery(true);
    const { data } = await supabase
      .from("gallery_items")
      .select("id, path, caption")
      .order("created_at", { ascending: false });

    const items = (data || []).map((row) => {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(row.path);
      return { id: row.id, name: row.path, url: urlData.publicUrl, caption: row.caption, isVideo: /\.(mp4|webm|mov)$/i.test(row.path) };
    });
    setExisting(items);
    setLoadingGallery(false);
  }

  const addFiles = (files) => {
    const entries = Array.from(files)
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .map((file) => {
        const isVideo = file.type.startsWith("video/");
        const limit   = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
        const limitMB = isVideo ? MAX_VIDEO_MB    : MAX_IMAGE_MB;
        const sizeMB  = (file.size / 1024 / 1024).toFixed(1);
        const error   = file.size > limit ? `File is ${sizeMB} MB — max is ${limitMB} MB for ${isVideo ? "videos" : "images"}` : "";
        return { file, caption: "", uploading: false, progress: 0, done: false, error };
      });
    setSelected((prev) => [...prev, ...entries]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const updateCaption = (i, caption) => setSelected((prev) => prev.map((s, idx) => idx === i ? { ...s, caption } : s));
  const removeFile   = (i)          => setSelected((prev) => prev.filter((_, idx) => idx !== i));

  const uploadAll = async () => {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].done || selected[i].error) continue;
      setSelected((prev) => prev.map((s, idx) => idx === i ? { ...s, uploading: true, progress: 10 } : s));

      const { file, caption } = selected[i];
      const safeName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

      // Simulate progress while uploading
      const tick = setInterval(() => {
        setSelected((prev) => prev.map((s, idx) => idx === i && s.progress < 85 ? { ...s, progress: s.progress + 15 } : s));
      }, 300);

      const { error } = await supabase.storage.from(BUCKET).upload(safeName, file, { upsert: false });
      clearInterval(tick);

      if (error) {
        setSelected((prev) => prev.map((s, idx) => idx === i ? { ...s, uploading: false, error: error.message } : s));
        continue;
      }

      await supabase.from("gallery_items").insert({
        path: safeName,
        caption: caption.trim() || null,
        is_visible: true,
      });

      setSelected((prev) => prev.map((s, idx) => idx === i ? { ...s, uploading: false, progress: 100, done: true } : s));
    }

    // Refresh existing gallery
    await loadExisting();
    // Clear done items after short delay
    setTimeout(() => setSelected((prev) => prev.filter((s) => !s.done)), 1500);
  };

  const pendingCount = selected.filter((s) => !s.done && !s.error).length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg,#0a0000 0%,#1a0000 60%,#0a0000 100%)" }}>

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gold/15 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,0,0,0.95)", backdropFilter: "blur(12px)" }}>
        <div>
          <div className="font-display text-lg gold-gradient-text tracking-widest">Torana Admin</div>
          <div className="text-cream/35 font-sans text-xs">Gallery Manager</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-cream/50 hover:text-gold font-sans text-xs transition-colors">← View Site</a>
          <button onClick={onLogout}
            className="px-4 py-2 font-sans text-xs font-bold tracking-wider uppercase rounded-lg border border-cream/15 text-cream/50 hover:border-red-500/50 hover:text-red-400 transition-all">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* Upload zone */}
        <section>
          <h2 className="font-serif text-2xl text-gold-light mb-6">Upload Images / Videos</h2>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-2xl flex flex-col items-center justify-center gap-4 py-14 cursor-pointer transition-all duration-200"
            style={{
              border: `2px dashed ${dragOver ? "#D4AF37" : "rgba(212,175,55,0.25)"}`,
              background: dragOver ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="text-5xl">📁</div>
            <div className="text-center">
              <p className="text-cream/70 font-sans text-sm font-semibold">Drag & drop images or videos here</p>
              <p className="text-cream/30 font-sans text-xs mt-1">or click to browse — JPG, PNG, MP4, MOV</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-[11px] font-sans px-2.5 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.25)" }}>
                  📷 Images — max 5 MB
                </span>
                <span className="text-[11px] font-sans px-2.5 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.25)" }}>
                  🎥 Videos — max 30 MB
                </span>
              </div>
            </div>
            <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => addFiles(e.target.files)} />
          </div>

          {/* Selected previews */}
          {selected.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selected.map((s, i) => (
                  <FilePreview
                    key={i}
                    file={s.file}
                    caption={s.caption}
                    onCaption={(v) => updateCaption(i, v)}
                    onRemove={() => removeFile(i)}
                    uploading={s.uploading}
                    progress={s.progress}
                    done={s.done}
                    error={s.error}
                  />
                ))}
              </div>

              {pendingCount > 0 && (
                <button onClick={uploadAll}
                  className="w-full py-4 font-sans font-bold text-sm tracking-wider uppercase rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000", boxShadow: "0 0 24px rgba(212,175,55,0.25)" }}>
                  Upload {pendingCount} {pendingCount === 1 ? "file" : "files"} to Gallery
                </button>
              )}
            </div>
          )}
        </section>

        {/* Existing gallery */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-gold-light">Gallery ({existing.length} items)</h2>
            <button onClick={loadExisting} className="text-cream/40 hover:text-gold font-sans text-xs transition-colors">↻ Refresh</button>
          </div>

          {loadingGallery && <p className="text-cream/30 font-sans text-sm">Loading…</p>}

          {!loadingGallery && existing.length === 0 && (
            <p className="text-cream/30 font-sans text-sm">No images uploaded yet. Use the upload zone above.</p>
          )}

          {existing.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {existing.map((item) => (
                <GalleryItem key={item.name} item={item} onDelete={(name) => setExisting((prev) => prev.filter((i) => i.name !== name))} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0000" }}>
        <div className="text-gold/50 font-sans text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) return <LoginForm onLogin={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
