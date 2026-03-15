import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",         href: "#hero"         },
  { label: "Services",     href: "#services"     },
  { label: "Gallery",      href: "#gallery"      },
  { label: "Reviews",      href: "#testimonials" },
  { label: "About",        href: "#about"        },
  { label: "Contact",      href: "#contact"      },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection("#" + e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => sections.forEach((s) => obs.unobserve(s));
  }, []);

  const handleClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(45,0,0,0.97)"
          : "linear-gradient(to bottom, rgba(45,0,0,0.92), rgba(45,0,0,0.5))",
        backdropFilter: "blur(14px)",
        boxShadow: scrolled ? "0 2px 32px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <button onClick={() => handleClick("#hero")} className="flex items-baseline gap-2 focus:outline-none group" aria-label="Torana Creatives – Home">
          <span className="font-display text-xl sm:text-2xl tracking-widest gold-gradient-text">Torana</span>
          <span className="font-kannada text-gold-light text-lg hidden sm:inline tracking-wide">ತೋರಣ</span>
          <span className="text-cream/40 text-[9px] tracking-[0.25em] uppercase hidden sm:inline">Creatives</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className="relative px-4 py-2 font-sans text-sm font-semibold tracking-wider uppercase transition-colors duration-200 focus:outline-none"
                style={{ color: activeSection === href ? "#D4AF37" : "rgba(255,253,208,0.7)" }}
              >
                {label}
                {activeSection === href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold" />
                )}
              </button>
            </li>
          ))}
          <li className="ml-3">
            <button
              onClick={() => handleClick("#contact")}
              className="px-5 py-2 font-sans text-xs font-bold tracking-wider uppercase rounded-sm hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}
            >
              Book Now
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="md:hidden p-2 focus:outline-none" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-gold rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-gold rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-gold rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gold/20 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        style={{ background: "rgba(26,0,0,0.98)" }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className="w-full text-left py-3 border-b border-gold/10 font-sans text-sm font-semibold tracking-wider uppercase transition-colors"
                style={{ color: activeSection === href ? "#D4AF37" : "rgba(255,253,208,0.75)" }}
              >
                {label}
              </button>
            </li>
          ))}
          <li className="mt-3">
            <button
              onClick={() => handleClick("#contact")}
              className="w-full py-3 font-sans text-sm font-bold tracking-wider uppercase rounded-sm"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}
            >
              Book Your Event
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
