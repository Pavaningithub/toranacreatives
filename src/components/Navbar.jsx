import { useState, useEffect } from "react";
import { MangoLeafTorana } from "./Decorations";

const NAV_LINKS = [
  { label: "Home",     href: "#hero"     },
  { label: "Services", href: "#services" },
  { label: "Gallery",  href: "#gallery"  },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-maroon shadow-maroon"
          : "bg-gradient-to-b from-maroon/95 to-maroon/80 backdrop-blur-sm"
      }`}
    >
      {/* Top gold accent stripe + torana */}
      <div className="overflow-hidden h-8 hidden md:block">
        <MangoLeafTorana className="w-full h-8" />
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleClick("#hero")}
          className="flex flex-col leading-none focus:outline-none"
          aria-label="Torana Creatives – Home"
        >
          <span className="font-display text-gold text-xl sm:text-2xl tracking-widest gold-gradient-text">
            Torana
          </span>
          <span className="font-kannada text-gold-light text-base sm:text-lg tracking-wider -mt-0.5">
            ತೋರಣ
          </span>
          <span className="text-cream/60 text-[9px] tracking-[0.25em] uppercase mt-0.5">
            Creatives
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className={`px-4 py-2 font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-200 rounded-sm
                  ${activeLink === href
                    ? "text-gold border-b-2 border-gold"
                    : "text-cream/80 hover:text-gold hover:border-b-2 hover:border-gold/50"
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
          <li className="ml-2">
            <button
              onClick={() => handleClick("#contact")}
              className="btn-gold text-xs py-2 px-5"
            >
              Book Now
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gold focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gold mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-maroon-dark border-t border-gold/30 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-2">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className="w-full text-left text-cream/90 hover:text-gold font-semibold py-2 border-b border-gold/10 tracking-wider uppercase text-sm"
              >
                {label}
              </button>
            </li>
          ))}
          <li className="mt-2">
            <button onClick={() => handleClick("#contact")} className="btn-gold w-full justify-center text-sm">
              Book Your Event
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
