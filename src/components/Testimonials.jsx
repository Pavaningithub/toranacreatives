import { useState, useEffect, useRef } from "react";
import { WHATSAPP_NUMBER } from "../config/launch";

// ─────────────────────────────────────────────────────────────
//  TESTIMONIALS
//  • Seed testimonials are shown by default.
//  • Visitors submit a review → it goes to WhatsApp so you
//    can copy-paste approved ones into SEED_TESTIMONIALS.
//  • Stars, animated carousel, mobile-swipe friendly.
// ─────────────────────────────────────────────────────────────

const SEED_TESTIMONIALS = [
  {
    id: 1,
    name: "Ramesh & Deepa Sharma",
    event: "Wedding Ceremony",
    location: "Jayanagar, Bengaluru",
    rating: 5,
    text: "Torana Creatives made our daughter's wedding an unforgettable experience. Every detail — from the marigold torana at the entrance to the Vedic rituals — was handled with such love and precision. Our family was moved to tears.",
    avatar: "R",
    color: "#800000",
  },
  {
    id: 2,
    name: "Suresh Iyer",
    event: "Upanayana (Thread Ceremony)",
    location: "Malleshwaram, Bengaluru",
    rating: 5,
    text: "We trusted Torana Creatives with our son's Upanayana and they delivered beyond expectations. The pandits were knowledgeable, the décor was pristine, and everything ran exactly on Muhurtham time. Highly recommended.",
    avatar: "S",
    color: "#4a3000",
  },
  {
    id: 3,
    name: "Priya & Anand Bhat",
    event: "Grahapravesha",
    location: "Whitefield, Bengaluru",
    rating: 5,
    text: "Our Griha Pravesha was as auspicious as we dreamed. The Rangoli at the entrance, the banana leaf décor, the puja setup — everything was perfect. Team Torana was so calm and professional throughout.",
    avatar: "P",
    color: "#2d4a1e",
  },
  {
    id: 4,
    name: "Kavitha Narasimhan",
    event: "Sathyanarayana Puja",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    text: "The team organised our family's annual Sathyanarayana Puja beautifully. The flower arrangements were fresh, fragrant and incredibly detailed. We have already booked them again for next year!",
    avatar: "K",
    color: "#1a2d47",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i < count ? "fill-[#FFDB58]" : "fill-white/15"}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, active }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 flex flex-col justify-between p-8 sm:p-10 rounded-2xl ${active ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid rgba(212,175,55,0.2)" }}
    >
      {/* Quote mark */}
      <span className="absolute top-4 left-6 font-serif text-[6rem] leading-none text-gold/10 select-none pointer-events-none">"</span>

      <div className="relative z-10">
        <Stars count={t.rating} />
        <p className="mt-5 font-serif text-lg sm:text-xl text-cream/90 italic leading-relaxed">
          "{t.text}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-8 relative z-10">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${t.color},${t.color}88)`, border: "2px solid rgba(212,175,55,0.4)" }}>
          {t.avatar}
        </div>
        <div>
          <p className="font-sans font-bold text-gold text-sm">{t.name}</p>
          <p className="text-cream/50 text-xs font-sans mt-0.5">{t.event} · {t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", event: "", rating: 5, text: "" });
  const [sent, setSent] = useState(false);
  const timerRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % SEED_TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setActive(i);
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SEED_TESTIMONIALS.length), 5500);
  };

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const msg = `⭐ NEW TESTIMONIAL SUBMISSION\n\nName: ${form.name}\nEvent: ${form.event}\nRating: ${"⭐".repeat(form.rating)}\n\nReview:\n"${form.text}"\n\n— Submitted via toranacreatives.in`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="testimonials" className="py-24 overflow-hidden" style={{ background: "linear-gradient(160deg,#1a0000 0%,#4d0000 50%,#1a0000 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">What Families Say</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">Blessings & Reviews</h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-cream/50 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            200+ families have trusted us with their most sacred moments. Here are some of their stories.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative" style={{ minHeight: 280 }}>
          {SEED_TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} active={i === active} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {SEED_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 24 : 8, height: 8, background: i === active ? "#D4AF37" : "rgba(212,175,55,0.3)" }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Submit your review */}
        <div className="mt-16 text-center">
          {!showForm && !sent && (
            <div>
              <p className="text-cream/45 font-sans text-sm mb-4">Had a great experience with us?</p>
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
                <input type="text" value={form.name} onChange={update("name")} placeholder="e.g. Ramesh & Sunitha Kumar" required
                  className="w-full rounded-lg px-4 py-3 font-sans text-sm bg-white/10 border border-gold/25 text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20" />
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Event Type</label>
                <input type="text" value={form.event} onChange={update("event")} placeholder="e.g. Wedding, Upanayana, Grahapravesha"
                  className="w-full rounded-lg px-4 py-3 font-sans text-sm bg-white/10 border border-gold/25 text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20" />
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((n) => (
                    <button type="button" key={n} onClick={() => setForm((p) => ({ ...p, rating: n }))}
                      className="text-2xl transition-transform hover:scale-125">
                      <span style={{ filter: n <= form.rating ? "none" : "grayscale(1) opacity(0.3)" }}>⭐</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-cream/50 text-xs uppercase tracking-wider font-sans mb-1.5">Your Review *</label>
                <textarea value={form.text} onChange={update("text")} rows={4} required
                  placeholder="Tell us about your experience with Torana Creatives..."
                  className="w-full rounded-lg px-4 py-3 font-sans text-sm bg-white/10 border border-gold/25 text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 resize-none" />
              </div>

              <div className="flex gap-3">
                <button type="submit"
                  className="flex-1 py-3 font-sans font-bold text-sm tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000" }}>
                  Send via WhatsApp
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-3 font-sans text-sm rounded-lg border border-cream/20 text-cream/50 hover:border-cream/40 transition-all">
                  Cancel
                </button>
              </div>
              <p className="text-cream/25 font-sans text-xs text-center">
                Your review will be sent to us via WhatsApp and published after approval.
              </p>
            </form>
          )}

          {sent && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🙏</div>
              <p className="font-serif text-xl text-gold-light mb-2">Thank you for your blessings!</p>
              <p className="text-cream/50 font-sans text-sm">Your review has been sent to us and will be published after approval.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
