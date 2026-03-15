import { useEffect, useRef, useState } from "react";

const TICKER = [
  "ಶುಭ ಮುಹೂರ್ತ · Auspicious Beginnings",
  "ವಿವಾಹ ಸಂಸ್ಕಾರ · Sacred Vedic Weddings",
  "ಗೃಹಪ್ರವೇಶ · New Home Blessings",
  "ಉಪನಯನ · Sacred Thread Ceremony",
  "ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ · Divine Pujas",
  "ಷಷ್ಟ್ಯಬ್ಧಪೂರ್ತಿ · Milestone Celebrations",
  "ನಾಮಕರಣ · Sacred Naming Ceremony",
  "ಅನ್ನಪ್ರಾಶನ · First Rice Feeding",
];

function DiyaIcon({ style }) {
  return (
    <div className="absolute pointer-events-none select-none" style={{ ...style, animation: `floatDiya ${style.dur} ease-in-out ${style.delay} infinite` }}>
      <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
        <ellipse cx="10" cy="4.5" rx="2.5" ry="4.5" fill="#FFDB58" opacity="0.9" />
        <ellipse cx="10" cy="5.5" rx="1.2" ry="2.5" fill="#FF8C00" opacity="0.7" />
        <path d="M3 17 Q10 12 17 17 Q15 22 10 23 Q5 22 3 17Z" fill="#C45C00" />
        <path d="M3 17 Q10 14 17 17" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
        <rect x="9" y="11" width="2" height="5" rx="1" fill="#8B4513" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  const tickerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    let pos = 0; let raf;
    const run = () => {
      pos -= 0.45;
      const el = tickerRef.current;
      if (el) { if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0; el.style.transform = `translateX(${pos}px)`; }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg,#080000 0%,#300000 30%,#1a0000 65%,#050000 100%)" }}
    >
      {/* Slow-spin mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 600 600" className="w-[105vw] max-w-none opacity-[0.06]"
          style={{ animation: "spin 90s linear infinite" }}>
          {[...Array(16)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5} 300 300)`}>
              <ellipse cx="300" cy="75" rx="10" ry="52" fill="#D4AF37" />
              <ellipse cx="300" cy="110" rx="5" ry="28" fill="#800000" />
            </g>
          ))}
          {[55, 100, 148, 196, 240, 278].map((r) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#D4AF37" strokeWidth="0.7" />
          ))}
          <circle cx="300" cy="300" r="18" fill="#D4AF37" opacity="0.5" />
        </svg>
      </div>

      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(212,175,55,0.16) 0%, transparent 68%)" }} />

      {/* Floating diyas */}
      {[
        { top:"14%", left:"5%",   dur:"5.2s", delay:"0s"   },
        { top:"72%", left:"3.5%", dur:"6.1s", delay:"1.3s" },
        { top:"22%", right:"6%",  dur:"4.8s", delay:"0.6s" },
        { top:"80%", right:"4%",  dur:"5.7s", delay:"2.1s" },
        { top:"48%", left:"9%",   dur:"7s",   delay:"1.9s" },
        { top:"58%", right:"11%", dur:"6.5s", delay:"0.4s" },
      ].map((s, i) => <DiyaIcon key={i} style={{ ...s, zIndex: 3 }} />)}

      {/* Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-14 text-center transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        {/* Om + eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/70 font-sans text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold">
            ॐ &nbsp; Brahmin · South Indian Traditions &nbsp; ॐ
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Brand name */}
        <h1 className="mb-2" style={{ animationDelay: "0.15s" }}>
          <span className="block font-display leading-none tracking-[0.12em]"
            style={{
              fontSize: "clamp(4.5rem,15vw,10.5rem)",
              background: "linear-gradient(135deg,#c9991e 0%,#FFDB58 30%,#fff4b0 50%,#D4AF37 70%,#b8952e 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(212,175,55,0.5))",
            }}
          >Torana</span>
          <span className="block font-kannada text-gold-light tracking-widest mt-1"
            style={{ fontSize: "clamp(1.5rem,4.5vw,3rem)" }}>
            ತೋರಣ
            <span className="font-sans text-cream/35 align-middle ml-3"
              style={{ fontSize: "clamp(0.6rem,1.5vw,0.9rem)", letterSpacing: "0.45em" }}>CREATIVES</span>
          </span>
        </h1>

        {/* Divider dots */}
        <div className="flex items-center justify-center gap-2 my-7">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/50" />
          {[8,12,8].map((s, i) => <span key={i} className="rounded-full bg-gold inline-block flex-shrink-0" style={{ width: s, height: s, opacity: i === 1 ? 0.9 : 0.45 }} />)}
          <span className="text-gold/50 text-lg mx-1 font-serif select-none">✦</span>
          <span className="text-gold/60 font-sans text-[10px] tracking-[0.55em] uppercase">Est. Bengaluru</span>
          <span className="text-gold/50 text-lg mx-1 font-serif select-none">✦</span>
          {[8,12,8].map((s, i) => <span key={i} className="rounded-full bg-gold inline-block flex-shrink-0" style={{ width: s, height: s, opacity: i === 1 ? 0.45 : 0.9 }} />)}
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-cream/90 leading-snug max-w-4xl mx-auto"
          style={{ fontSize: "clamp(1.2rem,3.2vw,2.5rem)", textShadow: "0 2px 28px rgba(0,0,0,0.8)" }}>
          "Where Sacred Traditions Meet Timeless Elegance."
        </p>

        {/* Sub copy */}
        <p className="mt-5 text-cream/50 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Vedic Weddings · Grahapravesha · Upanayana · Sathyanarayana Puja<br className="hidden sm:block" />
          Crafted with devotion for Brahmin families across Bengaluru &amp; beyond.
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-9">
          {[["200+","Events"],["8+","Years"],["50+","Rituals"],["1000+","Families"]].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", background: "linear-gradient(135deg,#FFDB58,#D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
              <div className="text-cream/35 text-[10px] uppercase tracking-widest font-sans mt-0.5">{l}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-11 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => scrollTo("#contact")}
            className="group relative overflow-hidden px-10 py-4 font-sans font-bold text-sm tracking-wider uppercase rounded-sm"
            style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#080000", boxShadow: "0 0 36px rgba(212,175,55,0.38)" }}>
            <span className="relative z-10 flex items-center gap-2">🪔 Book Your Event</span>
            <span className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button onClick={() => scrollTo("#services")}
            className="px-10 py-4 font-sans font-bold text-sm tracking-wider uppercase rounded-sm border-2 border-gold/55 text-gold hover:bg-gold/10 transition-all duration-300">
            ✦ Our Services
          </button>
          <button onClick={() => scrollTo("#gallery")}
            className="px-10 py-4 font-sans font-bold text-sm tracking-wider uppercase rounded-sm border border-cream/12 text-cream/50 hover:border-cream/35 hover:text-cream transition-all duration-300">
            View Gallery
          </button>
        </div>

        {/* Instagram quick-link */}
        <div className="mt-7 flex items-center justify-center">
          <a href="https://instagram.com/torana_creatives" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-sans text-cream/35 hover:text-gold transition-colors tracking-widest uppercase">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @torana_creatives
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-[9px] tracking-[0.55em] uppercase font-sans text-gold">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-gold/40 flex items-start justify-center p-1 mt-1">
            <span className="w-1 h-2 rounded-full bg-gold" style={{ animation: "scrollDot 1.8s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 overflow-hidden border-t border-b border-gold/15 py-2.5 flex-shrink-0"
        style={{ background: "rgba(0,0,0,0.4)" }}>
        <div ref={tickerRef} className="flex whitespace-nowrap will-change-transform" style={{ width: "max-content" }}>
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="text-gold/60 font-sans text-[11px] tracking-widest uppercase px-8 flex items-center gap-3 flex-shrink-0">
              <span className="text-gold/30 text-base">✦</span> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ zIndex: 6, background: "linear-gradient(to bottom, transparent, #FFFDD0)" }} />
    </section>
  );
}

