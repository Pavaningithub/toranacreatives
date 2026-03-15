import { useState } from "react";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, LOCATION } from "../config/launch";

const EVENT_TYPES = [
  "Traditional Wedding & Muhurtham",
  "Grahapravesha (Housewarming)",
  "Upanayana (Thread Ceremony)",
  "Floral & Eco-friendly Decor",
  "Seemantha / Baby Shower",
  "Sashtiabdapoorthi (60th Birthday)",
  "Other South Indian Event",
];

const BENGALURU_AREAS = [
  "Indiranagar", "Koramangala", "Jayanagar", "Rajajinagar",
  "Whitefield", "Electronic City", "Malleshwaram",
  "Yelahanka", "Bannerghatta Road", "Mysuru Road", "Other",
];

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const buildMsg = (d) =>
  `Namaskara! 🙏\n\nI am interested in Torana (ತೋರಣ) Creatives.\n\n👤 Name: ${d.name}\n📱 Phone: ${d.phone}\n🎉 Event: ${d.eventType}\n📅 Date: ${d.eventDate}\n📍 Location: ${d.location}\n💬 Message: ${d.message || "N/A"}\n\nKindly get in touch at your earliest convenience.`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMsg(form))}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const inputCls = (f) =>
    `w-full rounded-lg px-4 py-3 font-sans text-sm transition-all focus:outline-none focus:ring-2 ${
      errors[f]
        ? "border border-red-400 bg-red-50 focus:ring-red-200"
        : "border border-maroon/15 bg-white focus:ring-gold/30 focus:border-gold/60 text-maroon placeholder:text-maroon/30"
    }`;

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-cream">
        <div className="max-w-xl mx-auto px-6 text-center py-20">
          <div className="text-6xl mb-6">🙏</div>
          <h3 className="font-serif text-3xl text-maroon mb-3">Namaskara!</h3>
          <p className="text-maroon/65 font-sans mb-6 leading-relaxed">
            Your enquiry has been sent via WhatsApp. We'll reach out shortly to craft your perfect celebration.
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

        {/* Header */}
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

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
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

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Namaskara! I'd like to enquire about Torana (ತೋರಣ) Creatives services.")}`}
              target="_blank" rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#25D366,#1ebe5e)" }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl p-6 sm:p-8 space-y-5 bg-white shadow-gold"
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
                <label className="block text-maroon/55 font-sans text-xs uppercase tracking-wider mb-1.5">Area in Bengaluru *</label>
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
              className="flex items-center justify-center gap-3 w-full py-4 rounded-lg font-sans font-bold text-sm tracking-wider uppercase transition-all hover:scale-[1.02] animate-pulse-gold"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Send Enquiry via WhatsApp
            </button>
            <p className="text-center text-maroon/35 font-sans text-xs">WhatsApp will open with your details pre-filled.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
