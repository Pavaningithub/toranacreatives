import { TempleBorder } from "./Decorations";

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #5C0000 0%, #800000 40%, #3D0000 100%)",
      }}
    >
      {/* Rangoli mandala background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='100' cy='100' r='90' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='70' stroke='%23D4AF37' stroke-width='0.7'/%3E%3Ccircle cx='100' cy='100' r='50' stroke='%23D4AF37' stroke-width='0.7'/%3E%3Ccircle cx='100' cy='100' r='30' stroke='%23D4AF37' stroke-width='1'/%3E%3Cpath d='M100 10 L110 90 L190 100 L110 110 L100 190 L90 110 L10 100 L90 90Z' stroke='%23D4AF37' stroke-width='1' fill='none'/%3E%3Cpath d='M100 40 L107 93 L160 100 L107 107 L100 160 L93 107 L40 100 L93 93Z' stroke='%23FFDB58' stroke-width='0.5' fill='none' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "350px 350px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-gold/20 animate-float" />
      <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full border border-mustard/15 animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-8 w-20 h-20 rounded-full bg-gold/5 animate-float" style={{ animationDelay: "0.8s" }} />

      {/* Temple border bottom */}
      <TempleBorder className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40 text-center">
        {/* Pre-heading */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <span className="h-px w-16 bg-gold/60" />
          <span className="text-mustard font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
            Bengaluru's Finest
          </span>
          <span className="h-px w-16 bg-gold/60" />
        </div>

        {/* Brand name */}
        <h1 className="mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="block font-display text-5xl sm:text-7xl md:text-8xl gold-gradient-text tracking-widest drop-shadow-lg">
            Torana
          </span>
          <span className="block font-kannada text-3xl sm:text-5xl text-gold-light mt-1 tracking-wide">
            ತೋರಣ
          </span>
          <span className="block text-cream/70 text-base sm:text-lg tracking-[0.4em] uppercase font-sans mt-2">
            Creatives
          </span>
        </h1>

        {/* Divider ornament */}
        <div className="flex items-center justify-center gap-3 my-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
          <svg viewBox="0 0 32 32" width="28" height="28" className="text-gold">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
              <ellipse
                key={i} cx="16" cy="9" rx="2.5" ry="6"
                fill={i % 2 === 0 ? "#D4AF37" : "#800000"}
                opacity="0.85"
                transform={`rotate(${a} 16 16)`}
              />
            ))}
            <circle cx="16" cy="16" r="3.5" fill="#D4AF37" />
          </svg>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Headline */}
        <p
          className="text-cream text-xl sm:text-3xl md:text-4xl font-serif italic leading-relaxed max-w-3xl mx-auto text-shadow-gold animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          "Crafting Timeless Traditions for Your Special Moments."
        </p>

        {/* Subtext */}
        <p
          className="mt-6 text-cream/75 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Rooted in the richness of South Indian culture — we bring the sacred,
          the joyful, and the beautiful together for your most treasured milestones.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button onClick={() => scrollTo("#services")} className="btn-gold text-sm">
            ✦ Explore Services
          </button>
          <button onClick={() => scrollTo("#contact")} className="btn-primary text-sm animate-pulse-gold">
            Book Your Event
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-1 text-gold/50 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent animate-float" />
        </div>
      </div>
    </section>
  );
}
