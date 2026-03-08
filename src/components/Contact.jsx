import { useState } from "react";
import { RangoliDivider } from "./Decorations";
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

/* WhatsApp SVG icon — reusable */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const buildWhatsAppMessage = (data) => {
  const msg = `Namaskara! 🙏\n\nI am interested in your services at Torana (ತೋರಣ) Creatives.\n\n👤 Name: ${data.name}\n📱 Phone: ${data.phone}\n🎉 Event: ${data.eventType}\n📅 Date: ${data.eventDate}\n📍 Location: ${data.location}\n💬 Message: ${data.message || "N/A"}\n\nKindly get in touch at your earliest convenience.`;
  return encodeURIComponent(msg);
};

/* Build a wa.me URL only at the moment of click — number never rendered as text */
const waUrl = (msg = "") =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`
    : "#";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())                   e.name      = "Please enter your name.";
    if (!form.phone.match(/^[6-9]\d{9}$/))   e.phone     = "Enter a valid 10-digit mobile number.";
    if (!form.eventType)                     e.eventType = "Please select the event type.";
    if (!form.eventDate)                     e.eventDate = "Please choose a date.";
    if (!form.location.trim())               e.location  = "Please mention your area in Bengaluru.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(form)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputCls = (field) =>
    `w-full bg-white border ${errors[field] ? "border-red-400" : "border-gold/40 focus:border-gold"} rounded-sm px-4 py-3 text-maroon font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 placeholder:text-maroon/35 transition-all`;

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-rangoli border-temple-top">
        <div className="max-w-xl mx-auto px-6 text-center py-20">
          <div className="text-6xl mb-4">🙏</div>
          <h3 className="font-serif text-3xl text-maroon mb-3">Namaskara!</h3>
          <p className="text-maroon/70 font-sans mb-6">
            Your enquiry has been sent via WhatsApp. We'll reach out to you shortly to discuss your special event.
          </p>
          <p className="text-gold font-serif italic text-lg mb-8">
            "May your celebrations be filled with joy and tradition."
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Submit Another Enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-rangoli border-temple-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">
            Get In Touch
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon mt-2 heading-underline">
            Plan Your Celebration
          </h2>
          <p className="text-maroon/60 font-sans mt-6 max-w-xl mx-auto text-sm leading-relaxed">
            Share your event details below and we'll reach out to craft a personalised experience
            rooted in South Indian tradition.
          </p>
        </div>

        <RangoliDivider className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-temple bg-white/80 p-6 space-y-5">
              <h3 className="font-serif text-xl text-maroon">Reach Us Directly</h3>

              {/* Email — shown as text since email addresses are not sensitive */}
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">📧</span>
                <div>
                  <p className="text-maroon/50 font-sans text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-maroon font-sans text-sm hover:text-gold transition-colors break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              {/* WhatsApp — icon only, no number displayed */}
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">💬</span>
                <div>
                  <p className="text-maroon/50 font-sans text-xs uppercase tracking-wider mb-1">WhatsApp</p>
                  <a
                    href={waUrl("Namaskara! I'd like to enquire about Torana (ತೋರಣ) Creatives services.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5e] font-sans text-sm font-semibold transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">📍</span>
                <div>
                  <p className="text-maroon/50 font-sans text-xs uppercase tracking-wider mb-0.5">We Serve</p>
                  <p className="text-maroon font-sans text-sm">{LOCATION}</p>
                  <p className="font-kannada text-gold text-sm">ಬೆಂಗಳೂರು ಮತ್ತು ಸುತ್ತಮುತ್ತ</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">🕐</span>
                <div>
                  <p className="text-maroon/50 font-sans text-xs uppercase tracking-wider mb-0.5">Hours</p>
                  <p className="text-maroon font-sans text-sm">Mon – Sat: 9 AM – 8 PM</p>
                  <p className="text-maroon/60 font-sans text-xs">Available on auspicious days too!</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA button — icon only, no number */}
            <a
              href={waUrl("Namaskara! I'd like to enquire about Torana (ತೋರಣ) Creatives services.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp to chat with Torana Creatives"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-sm font-semibold text-sm tracking-wide bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5e] transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 card-temple bg-white/80 p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-xl text-maroon mb-2">Enquiry Form</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Ramesh Kumar"
                  className={inputCls("name")}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  className={inputCls("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className={inputCls("email")}
              />
            </div>

            {/* Event type */}
            <div>
              <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                Event Type *
              </label>
              <select value={form.eventType} onChange={update("eventType")} className={inputCls("eventType")}>
                <option value="">— Select Event Type —</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={update("eventDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputCls("eventDate")}
                />
                {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                  Area in Bengaluru *
                </label>
                <select value={form.location} onChange={update("location")} className={inputCls("location")}>
                  <option value="">— Select Area —</option>
                  {BENGALURU_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-maroon/70 font-sans text-xs uppercase tracking-wider mb-1.5">
                Additional Details
              </label>
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={4}
                placeholder="Number of guests, specific customs, special requests..."
                className={inputCls("message") + " resize-none"}
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary w-full justify-center py-4 text-base animate-pulse-gold">
              <WhatsAppIcon className="w-5 h-5" />
              Send Enquiry via WhatsApp
            </button>

            <p className="text-center text-maroon/45 font-sans text-xs">
              Clicking submit will open WhatsApp with your details pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
