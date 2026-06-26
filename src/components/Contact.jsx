import { useState } from "react";
import { CONTACT_EMAIL, LOCATION } from "../config/launch";

const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Housewarming (Gruhapravesha)",
  "Upanayana (Thread Ceremony)",
  "Birthday Celebration",
  "Shashtipoorthi",
  "Seemantha / Baby Shower",
  "Other South Indian Ceremony",
];

const BENGALURU_AREAS = [
  "Indiranagar", "Koramangala", "Jayanagar", "Rajajinagar",
  "Whitefield", "Electronic City", "Malleshwaram",
  "Yelahanka", "Bannerghatta Road", "Mysuru Road", "Tumkur", "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())                 e.name      = "Please enter your name.";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone     = "Enter a valid 10-digit mobile number.";
    if (!form.eventType)                   e.eventType = "Please select the event type.";
    if (!form.eventDate)                   e.eventDate = "Please choose a date.";
    if (!form.location.trim())             e.location  = "Please mention your area.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);

    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const inputCls = (f) =>
    `w-full rounded-lg px-4 py-3 font-sans text-sm text-maroon transition-all focus:outline-none focus:ring-2 ${
      errors[f]
        ? "border border-red-400 bg-red-50 focus:ring-red-200"
        : "border border-maroon/15 bg-white focus:ring-gold/30 focus:border-gold/60 placeholder:text-maroon/30"
    }`;

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-cream">
        <div className="max-w-xl mx-auto px-6 text-center py-20">
          <div className="text-6xl mb-6">🙏</div>
          <h3 className="font-serif text-3xl text-maroon mb-3">Namaskara!</h3>
          <p className="text-maroon/65 font-sans mb-6 leading-relaxed">
            Your enquiry has been received. We'll reach out shortly to craft your perfect celebration.
          </p>
          <p className="text-gold font-serif italic text-lg mb-8">"May your celebrations be filled with joy and tradition."</p>
          <button onClick={() => setSubmitted(false)} className="px-8 py-3 font-sans font-semibold text-sm tracking-wider uppercase rounded-sm" style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}>
            Submit Another Enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">Get In Touch</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon-dark mt-3 mb-4">Plan Your Celebration</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-maroon/55 font-sans max-w-xl mx-auto text-sm leading-relaxed">
            Share your event details and we'll craft a personalised experience rooted in South Indian tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          <div className="lg:col-span-2 order-2 lg:order-1 space-y-5">
            <div className="rounded-2xl p-6 space-y-5" style={{ background: "linear-gradient(135deg,#2d0000,#5c0000)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <h3 className="font-serif text-xl text-gold-light">Reach Us Directly</h3>
              {[
                { icon: "📧", label: "Email", content: <a href={`mailto:${CONTACT_EMAIL}`} className="text-cream/80 hover:text-gold text-sm transition-colors break-all">{CONTACT_EMAIL}</a> },
                { icon: "📍", label: "We Serve", content: <><p className="text-cream/80 text-sm">{LOCATION}</p><p className="font-kannada text-gold/80 text-sm">ಬೆಂಗಳೂರು ಮತ್ತು ಸುತ್ತಮುತ್ತ</p></> },
                { icon: "🕐", label: "Hours",   content: <><p className="text-cream/80 text-sm">Mon – Sat: 9 AM – 8 PM</p><p className="text-cream/45 text-xs">Available on auspicious days too!</p></> },
              ].map(({ icon, label, content }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div><p className="text-cream/40 text-xs uppercase tracking-wider mb-1 font-sans">{label}</p>{content}</div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 order-1 lg:order-2 rounded-2xl p-5 sm:p-8 space-y-5 bg-white shadow-gold"
            style={{ border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <h3 className="font-serif text-xl text-maroon">Enquiry Form</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Your Name *</label>
                <input type="text" value={form.name} onChange={update("name")} placeholder="Ramesh Kumar" className={inputCls("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Mobile Number *</label>
                <input type="tel" value={form.phone} onChange={update("phone")} placeholder="98XXXXXXXX" maxLength={10} className={inputCls("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputCls("email")} />
            </div>

            <div>
              <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Event Type *</label>
              <select value={form.eventType} onChange={update("eventType")} className={inputCls("eventType")}>
                <option value="">— Select Event Type —</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Event Date *</label>
                <input type="date" value={form.eventDate} onChange={update("eventDate")} min={new Date().toISOString().split("T")[0]} className={inputCls("eventDate")} />
                {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
              </div>
              <div>
                <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Your Area *</label>
                <select value={form.location} onChange={update("location")} className={inputCls("location")}>
                  <option value="">— Select Area —</option>
                  {BENGALURU_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>
            </div>

            <div>
              <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Additional Details</label>
              <textarea value={form.message} onChange={update("message")} rows={4} placeholder="Number of guests, specific customs, special requests…" className={`${inputCls("message")} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-lg font-sans font-bold text-sm tracking-wider uppercase transition-all hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}
            >
              {submitting ? "Sending…" : "Send Enquiry 🙏"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
