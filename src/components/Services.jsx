import { RangoliDivider } from "./Decorations";

const SERVICES = [
  {
    icon: "🪔",
    title: "Traditional Weddings & Muhurthams",
    kannada: "ವಿವಾಹ ಮತ್ತು ಮುಹೂರ್ತ",
    desc: "Authentic South Indian wedding ceremonies adorned with banana leaf mandapas, jasmine garlands, marigold toranas, and every traditional ritual performed with sacred precision.",
    highlights: ["Vedic Muhurtham planning", "Mandapa & floral decor", "Catering coordination", "Ritual arrangements"],
    color: "border-t-maroon",
    accent: "#800000",
  },
  {
    icon: "🏠",
    title: "Grahapravesha Decor",
    kannada: "ಗೃಹಪ್ರವೇಶ",
    desc: "Bless your new home with vibrant Rangoli at the entrance, mango leaf toranas on the doorway, puja setup and an auspicious atmosphere crafted with love.",
    highlights: ["Entrance torana design", "Puja room setup", "Rangoli & kolam art", "Flower & coconut décor"],
    color: "border-t-gold",
    accent: "#D4AF37",
  },
  {
    icon: "🧵",
    title: "Upanayana Management",
    kannada: "ಉಪನಯನ",
    desc: "Sacred thread ceremony organized with complete attention to Vedic tradition — from the pravara recitation to the yagnopavita, we handle every detail reverently.",
    highlights: ["Full ritual management", "Pandit coordination", "Venue decoration", "Traditional attire guidance"],
    color: "border-t-mustard",
    accent: "#FFDB58",
  },
  {
    icon: "🌸",
    title: "Floral & Eco-Friendly Decor",
    kannada: "ಹೂ ಮತ್ತು ಪರಿಸರ ಸ್ನೇಹಿ ಅಲಂಕಾರ",
    desc: "Zero-plastic, nature-first event décor using banana leaves, fresh marigolds, jasmine strands, sugarcane pillars, and clay diyas — beautiful and responsible.",
    highlights: ["Marigold & jasmine themes", "Banana leaf arrangements", "Clay diya lighting", "Zero plastic commitment"],
    color: "border-t-green-700",
    accent: "#4A7C2F",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-rangoli border-temple-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">What We Offer</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon mt-2 heading-underline">
            Our Sacred Services
          </h2>
          <p className="text-maroon/65 font-sans mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Every celebration is a thread in the fabric of your family's story.
            Torana (ತೋರಣ) Creatives weaves it with tradition, beauty, and care.
          </p>
        </div>

        <RangoliDivider className="mb-12" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="card-temple bg-white/80 backdrop-blur-sm p-6 flex flex-col gap-4 group hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-gold mb-2 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${svc.accent}15`, border: `2px solid ${svc.accent}40` }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-maroon font-semibold leading-tight">
                  {svc.title}
                </h3>
                <p className="font-kannada text-gold text-sm mt-0.5">{svc.kannada}</p>
              </div>

              {/* Desc */}
              <p className="text-maroon/65 font-sans text-sm leading-relaxed flex-1">{svc.desc}</p>

              {/* Highlights */}
              <ul className="space-y-1.5 mt-2">
                {svc.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-sans text-maroon/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-4 text-xs font-semibold tracking-wider uppercase text-gold border border-gold/40 rounded-sm py-2 hover:bg-maroon hover:text-cream transition-all duration-200"
              >
                Enquire →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
