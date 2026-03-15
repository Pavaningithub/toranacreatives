import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "../config/launch";

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1a0000 0%,#0d0000 100%)" }}
    >
      {/* Gold top accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, #800000, #D4AF37, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <div>
              <div className="font-display text-3xl gold-gradient-text tracking-widest">Torana</div>
              <div className="font-kannada text-gold-light text-xl">ತೋರಣ</div>
              <div className="text-cream/35 text-[10px] tracking-[0.3em] uppercase mt-0.5">Creatives</div>
            </div>
            <p className="text-cream/45 font-sans text-sm leading-relaxed max-w-xs">
              Bengaluru's most trusted South Indian traditional event management company. Rooted in culture, crafted with love.
            </p>

          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-gold-light text-base mb-5 tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[["#hero","Home"],["#services","Services"],["#gallery","Gallery"],["#about","About Us"],["#contact","Contact"]].map(([href, label]) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-cream/50 hover:text-gold font-sans text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-gold-light text-base mb-5 tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm font-sans text-cream/50">
              <p className="flex items-start gap-2">
                <span>📧</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold transition-colors break-all">{CONTACT_EMAIL}</a>
              </p>
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>Bengaluru, Karnataka<br /><span className="font-kannada text-cream/35">ಬೆಂಗಳೂರು</span></span>
              </p>
              <p className="flex items-start gap-2">
                <span>🕐</span>
                <span>Mon – Sat, 9 AM – 8 PM</span>
              </p>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-cream/25">
          <p>© 2026 Torana (ತೋರಣ) Creatives. All rights reserved.</p>
          <p className="font-kannada text-cream/20">ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ</p>
          <p>Crafted with 🪔 in Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}

/* WhatsApp SVG icon */
