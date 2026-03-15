import { useRef, useEffect, useState } from "react";

const SERVICES = [
  {
    icon: "🪔",
    title: "Weddings & Muhurthams",
    kannada: "ವಿವಾಹ ಮತ್ತು ಮುಹೂರ್ತ",
    desc: "Authentic South Indian weddings — from banana leaf mantapas and jasmine garlands to every Vedic ritual performed with sacred precision.",
    highlights: ["Muhurtham planning", "Mantapa & floral décor", "Full ritual management", "Catering coordination"],
    grad: "from-[#800000] to-[#5c0000]",
    accent: "#D4AF37",
    span: "lg:col-span-2",
  },
  {
    icon: "🏠",
    title: "Gruhapravesha",
    kannada: "ಗೃಹಪ್ರವೇಶ",
    desc: "Bless your new home with vibrant Rangoli, mango-leaf toranas, and a divinely decorated puja space.",
    highlights: ["Entrance torana", "Puja room setup", "Rangoli & kolam art"],
    grad: "from-[#4a3000] to-[#2d1a00]",
    accent: "#FFDB58",
    span: "",
  },
  {
    icon: "🧵",
    title: "Upanayana",
    kannada: "ಉಪನಯನ",
    desc: "Sacred thread ceremony managed with complete Vedic attention — every detail, every shloka, reverently handled.",
    highlights: ["Ritual management", "Pandit coordination", "Venue decoration"],
    grad: "from-[#1a3a1a] to-[#0d1f0d]",
    accent: "#86efac",
    span: "",
  },
  {
    icon: "🎂",
    title: "Birthday Celebrations",
    kannada: "ಜನ್ಮದಿನ ಆಚರಣೆ",
    desc: "Vibrant, tradition-infused birthday celebrations — from intimate family gatherings to grand parties with customised themes, floral décor, and joyful rituals.",
    highlights: ["Theme decoration", "Floral & balloon setup", "Cake ceremony", "Photography coordination"],
    grad: "from-[#2d0047] to-[#1a002b]",
    accent: "#d8b4fe",
    span: "",
  },
  {
    icon: "🙏",
    title: "Shashtipoorthi — 60th Birthday",
    kannada: "ಷಷ್ಟ್ಯಬ್ಧಪೂರ್ತಿ",
    desc: "A sacred milestone — honour your elders' 60th year with a grand Vedic celebration combining Saptapadi renewal, Pada Pooja, and traditional South Indian festivity.",
    highlights: ["Vedic rituals & Saptapadi", "Pada Pooja ceremony", "Traditional décor", "Pandit coordination"],
    grad: "from-[#003030] to-[#001a1a]",
    accent: "#5eead4",
    span: "lg:col-span-2",
  },
];

function ServiceCard({ svc, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl p-7 flex flex-col gap-4 group cursor-default transition-all duration-700 ${svc.span} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${svc.grad} -z-10`} />

      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px 0 ${svc.accent}25` }} />

      {/* Border shimmer */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
        style={{ background: `${svc.accent}18`, border: `1.5px solid ${svc.accent}40` }}
      >
        {svc.icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-tight">{svc.title}</h3>
        <p className="font-kannada text-sm mt-0.5" style={{ color: svc.accent }}>{svc.kannada}</p>
        <p className="text-white/60 font-sans text-sm leading-relaxed mt-3">{svc.desc}</p>
      </div>

      {/* Highlights */}
      <ul className="flex flex-wrap gap-2">
        {svc.highlights.map((h) => (
          <li
            key={h}
            className="text-xs font-sans font-semibold px-3 py-1 rounded-full"
            style={{ background: `${svc.accent}15`, color: svc.accent, border: `1px solid ${svc.accent}30` }}
          >
            {h}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-2 self-start text-xs font-semibold font-sans tracking-wider uppercase py-2 px-4 rounded-sm transition-all duration-200"
        style={{ color: svc.accent, border: `1px solid ${svc.accent}40` }}
        onMouseEnter={(e) => { e.currentTarget.style.background = svc.accent; e.currentTarget.style.color = "#1a0000"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = svc.accent; }}
      >
        Enquire →
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">What We Offer</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon-dark mt-3 mb-4">Our Sacred Services</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-maroon/65 font-sans max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Every celebration is a thread in your family's story.
            Torana (ತೋರಣ) Creatives weaves it with tradition, beauty, and care.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
