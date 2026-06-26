import { useState } from "react";

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-2 justify-center" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="transition-all duration-150 hover:scale-125 focus:outline-none"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <svg viewBox="0 0 20 20" className="w-10 h-10 transition-colors" fill={n <= (hover || value) ? "#FFDB58" : "rgba(255,255,255,0.15)"}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent!" };

const EVENT_OPTIONS = [
  "Wedding",
  "Engagement",
  "Housewarming (Gruhapravesha)",
  "Upanayana (Thread Ceremony)",
  "Birthday Celebration",
  "Shashtipoorthi",
  "Seemantha / Baby Shower",
  "Other South Indian Ceremony",
  "Other",
];

const INPUT_CLS = "w-full rounded-xl px-4 py-3.5 font-sans text-sm border border-gold/20 placeholder:text-cream/25 focus:outline-none focus:border-gold/55 focus:ring-2 focus:ring-gold/15 transition-all";
const INPUT_STYLE = { background: "#1a0505", color: "#FFFDD0", WebkitTextFillColor: "#FFFDD0" };

export default function FeedbackPage({ projectId }) {
  const [form, setForm] = useState({ name: "", phone: "", eventType: "", customEventType: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const resolvedEventType = form.eventType === "Other" ? form.customEventType : form.eventType;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.text.trim()) e.text = "Please share your experience.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id:    projectId,
        reviewer_name: form.name.trim(),
        phone:         form.phone.trim() || null,
        event_type:    resolvedEventType.trim() || null,
        rating:        form.rating,
        review_text:   form.text.trim(),
      }),
    }).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(160deg,#080000 0%,#280000 50%,#050000 100%)" }}>
        <div className="max-w-md w-full text-center py-16 px-8 rounded-3xl"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="text-7xl mb-6">🙏</div>
          <h2 className="font-serif text-3xl text-gold-light mb-3">Namaskara!</h2>
          <p className="text-cream/60 font-sans text-sm leading-relaxed mb-6">
            Thank you for sharing your experience. Your feedback means the world to us and helps us serve every family with greater devotion.
          </p>
          <div className="text-cream/30 font-sans text-xs">
            {form.rating >= 4
              ? "Your review may be featured on our website."
              : "Your feedback has been recorded and will help us improve."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg,#080000 0%,#280000 40%,#050000 100%)" }}>

      <header className="px-6 py-6 border-b border-gold/10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <div className="font-display text-xl gold-gradient-text tracking-widest">Torana</div>
            <div className="font-kannada text-gold-light text-sm">ತೋರಣ Creatives</div>
          </div>
          <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}>
            {projectId}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          <div className="text-center mb-10">
            <p className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans mb-3">Share Your Experience</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-cream mb-3">How did we do?</h1>
            <p className="text-cream/45 font-sans text-sm leading-relaxed">
              Your honest feedback helps us serve every family better. It only takes a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}>

            <div className="text-center">
              <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-4">Your Rating *</label>
              <StarPicker value={form.rating} onChange={(n) => setForm((p) => ({ ...p, rating: n }))} />
              <p className="text-gold font-sans text-sm font-semibold mt-3">{RATING_LABELS[form.rating]}</p>
            </div>

            <div>
              <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Your Name *</label>
              <input type="text" value={form.name} onChange={update("name")} placeholder="Your full name" className={INPUT_CLS} style={INPUT_STYLE} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">
                Phone <span className="text-cream/25 normal-case">(optional)</span>
              </label>
              <input type="tel" value={form.phone} onChange={update("phone")} placeholder="98XXXXXXXX" className={INPUT_CLS} style={INPUT_STYLE} />
            </div>

            <div>
              <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Event Type</label>
              <select value={form.eventType} onChange={update("eventType")}
                className={INPUT_CLS + " appearance-none cursor-pointer"} style={INPUT_STYLE}>
                <option value="">— Select your event —</option>
                {EVENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {form.eventType === "Other" && (
                <input
                  type="text"
                  value={form.customEventType}
                  onChange={update("customEventType")}
                  placeholder="Please describe your event"
                  className={INPUT_CLS + " mt-2"}
                  style={INPUT_STYLE}
                />
              )}
            </div>

            <div>
              <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Your Experience *</label>
              <textarea value={form.text} onChange={update("text")} rows={5} required
                placeholder="Tell us what you loved about our service, what we did well, or how we can improve…"
                className={`${INPUT_CLS} resize-none`} style={INPUT_STYLE} />
              {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
            </div>

            <button type="submit" disabled={submitting}
              className="w-full py-4 font-sans font-bold text-sm tracking-wider uppercase rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000", boxShadow: "0 0 28px rgba(212,175,55,0.3)" }}>
              {submitting ? "Submitting…" : "Submit My Feedback 🙏"}
            </button>

            <p className="text-cream/20 font-sans text-xs text-center leading-relaxed">
              Every word you share is read with gratitude by the Torana family. 🙏
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
