import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

function Stars({ count = 5, interactive = false, onSelect }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => onSelect(i + 1) : undefined}
          className={interactive ? "transition-transform hover:scale-125 focus:outline-none" : ""}
          style={{ cursor: interactive ? "pointer" : "default" }}
          aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
        >
          <svg viewBox="0 0 20 20" className={`w-5 h-5 ${i < count ? "fill-[#FFDB58]" : "fill-white/15"} transition-colors`}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const AVATAR_COLORS = ["#800000", "#4a3000", "#2d4a1e", "#1a2d47", "#5c0033", "#1a3a3a"];

function TestimonialCard({ t, active }) {
  const initial = t.reviewer_name?.[0]?.toUpperCase() || "?";
  const color = AVATAR_COLORS[t.id?.charCodeAt(0) % AVATAR_COLORS.length] || "#800000";
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 flex flex-col justify-between p-5 sm:p-8 lg:p-10 rounded-2xl ${active ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(212,175,55,0.2)" }}
    >
      <span className="absolute top-4 left-6 font-serif text-[6rem] leading-none text-gold/10 select-none pointer-events-none">"</span>

      <div className="relative z-10">
        <Stars count={t.rating} />
        {t.project_id && (
          <span className="inline-block mt-2 text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}>
            {t.project_id}
          </span>
        )}
        <p className="mt-4 font-serif text-base sm:text-lg lg:text-xl text-cream/90 italic leading-relaxed">
          "{t.review_text}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-8 relative z-10">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${color},${color}88)`, border: "2px solid rgba(212,175,55,0.4)" }}>
          {initial}
        </div>
        <div>
          <p className="font-sans font-bold text-gold text-sm">{t.reviewer_name}</p>
          <p className="text-cream/50 text-xs font-sans mt-0.5">
            {t.event_type}{t.event_type ? " · " : ""}Bengaluru
          </p>
        </div>
      </div>
    </div>
  );
}

const INPUT_CLS = "w-full rounded-lg px-4 py-3 font-sans text-sm border border-gold/25 placeholder:text-cream/25 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20";
const INPUT_STYLE = { background: "#1a0505", color: "#FFFDD0", WebkitTextFillColor: "#FFFDD0" };

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", event: "", rating: 5, text: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase
      .from("reviews")
      .select("id, reviewer_name, event_type, project_id, rating, review_text")
      .eq("is_approved", true)
      .gt("rating", 4)
      .order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (reviews.length < 2) return;
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [reviews.length]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setActive(i);
    if (reviews.length > 1) {
      timerRef.current = setInterval(() => setActive((a) => (a + 1) % reviews.length), 5500);
    }
  };

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setSubmitting(true);

    const payload = {
      reviewer_name: form.name.trim(),
      event_type: form.event.trim() || null,
      rating: Number(form.rating),
      review_text: form.text.trim(),
    };

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setSubmitting(false);
    setSent(true);
  };

  const hasReviews = !loading && reviews.length > 0;
  const isEmpty = !loading && reviews.length === 0;

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative" style={{ background: "linear-gradient(160deg,#12000a 0%,#3d0000 50%,#12000a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg viewBox="0 0 400 400" className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.04]" style={{ animation: "spin 60s linear infinite" }}>
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 200 200)`}>
              <ellipse cx="200" cy="60" rx="8" ry="40" fill="#D4AF37" />
              <ellipse cx="200" cy="80" rx="4" ry="22" fill="#800000" />
            </g>
          ))}
          {[40, 80, 120, 160].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">Blessings & Feedback</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">What Families Say</h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-cream/50 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Every celebration leaves a memory. Here are the words that families have shared with us.
          </p>
        </div>

        {loading && (
          <div className="text-center py-16 text-cream/30 font-sans text-sm">Loading reviews…</div>
        )}

        {hasReviews && (
          <>
            <div className="relative" style={{ minHeight: "clamp(300px, 50vw, 360px)" }}>
              {reviews.map((t, i) => (
                <TestimonialCard key={t.id} t={t} active={i === active} />
              ))}
            </div>
            {reviews.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i === active ? 24 : 8, height: 8, background: i === active ? "#D4AF37" : "rgba(212,175,55,0.3)" }}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {isEmpty && (
          <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="text-5xl mb-4">🙏</div>
            <p className="font-serif text-xl text-gold-light mb-2">Be the first to share your story</p>
            <p className="text-cream/40 font-sans text-sm max-w-sm mx-auto">
              We've had the privilege of serving wonderful families. Reviews will appear here as they come in.
            </p>
          </div>
        )}

        <div className="mt-14 text-center">
          {!showForm && !sent && (
            <div>
              <p className="text-cream/40 font-sans text-sm mb-4">Had a great experience with us?</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 font-sans font-semibold text-sm tracking-wider uppercase rounded-sm border-2 border-gold/50 text-gold hover:bg-gold/10 transition-all duration-200"
              >
                ✦ Share Your Experience
              </button>
            </div>
          )}

          {showForm && !sent && (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left space-y-5 mt-4 rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <h3 className="font-serif text-xl text-gold-light text-center mb-2">Share Your Review</h3>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Your Name *</label>
                <input type="text" value={form.name} onChange={update("name")} placeholder="e.g. Ramesh & Sunitha Kumar" required className={INPUT_CLS} style={INPUT_STYLE} />
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Event Type</label>
                <input type="text" value={form.event} onChange={update("event")} placeholder="e.g. Wedding, Gruhapravesha, Birthday" className={INPUT_CLS} style={INPUT_STYLE} />
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-2">Your Rating</label>
                <Stars count={form.rating} interactive onSelect={(n) => setForm((p) => ({ ...p, rating: n }))} />
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Your Review *</label>
                <textarea value={form.text} onChange={update("text")} rows={4} required
                  placeholder="Tell us about your experience with Torana Creatives…"
                  className={`${INPUT_CLS} resize-none`} style={INPUT_STYLE} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 font-sans font-bold text-sm tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000" }}>
                  {submitting ? "Submitting…" : "Submit Review"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="sm:flex-initial px-5 py-3 font-sans text-sm rounded-lg border border-cream/20 text-cream/50 hover:border-cream/40 transition-all">
                  Cancel
                </button>
              </div>
              <p className="text-cream/25 font-sans text-xs text-center">
                Thank you for taking the time to share your experience with us. 🙏
              </p>
            </form>
          )}

          {sent && (
            <div className="text-center py-10 rounded-2xl max-w-md mx-auto" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="text-5xl mb-4">🙏</div>
              <p className="font-serif text-xl text-gold-light mb-2">Thank you for your blessings!</p>
              <p className="text-cream/50 font-sans text-sm">
                Your words mean everything to us. Thank you for being part of the Torana family.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
