import { RangoliDivider } from "./Decorations";

const VALUES = [
  { icon: "🪷", title: "Rooted in Tradition", desc: "Every ritual, every arrangement honours centuries of South Indian heritage." },
  { icon: "🌿", title: "Eco-Friendly First", desc: "We choose banana leaves over plastic, clay over synthetic — always." },
  { icon: "💛", title: "Family-Centred Care", desc: "We treat your event like our own family celebration — with total dedication." },
  { icon: "✨", title: "Aesthetic Precision", desc: "From the kolam at the entrance to the last marigold petal — perfection in every detail." },
];

export default function About() {
  return (
    <section id="about" className="py-20 border-temple-top" style={{ background: "linear-gradient(160deg, #5C0000 0%, #800000 60%, #3D0000 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">
            Who We Are
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-2 heading-underline">
            About Torana{" "}
            <span className="font-kannada text-gold-light">(ತೋರಣ)</span>
          </h2>
        </div>

        <RangoliDivider className="mb-12 opacity-50" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className="space-y-6">
            <div className="relative">
              {/* Decorative quote mark */}
              <span className="absolute -top-4 -left-2 text-gold/20 font-serif text-9xl leading-none select-none">"</span>
              <blockquote className="relative font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed pl-4 border-l-2 border-gold/50">
                We don't just decorate events. We recreate the traditions
                your grandparents cherished, for the next generation to remember.
              </blockquote>
            </div>

            <p className="text-cream/75 font-sans text-sm sm:text-base leading-relaxed">
              Born in the vibrant city of Bengaluru, <strong className="text-gold">Torana (ತೋರಣ) Creatives</strong> was
              founded with one purpose: to keep South Indian cultural events as authentic, joyful, and
              spiritually meaningful as they have always been.
            </p>
            <p className="text-cream/75 font-sans text-sm sm:text-base leading-relaxed">
              Our team comprises event planners, floral artists, Vedic ritual coordinators, and décor
              specialists who have collectively managed over <strong className="text-mustard">200+ events</strong> across
              Bengaluru, Mysuru, and beyond — from intimate Grahapravesha ceremonies to grand multi-day
              weddings with 1000+ guests.
            </p>
            <p className="text-cream/75 font-sans text-sm sm:text-base leading-relaxed">
              We deeply respect each family's regional customs — be it the Brahmin rituals of Mysuru,
              the Vokkaliga traditions of rural Karnataka, or the Tamil Iyer customs that have found a
              home in Bengaluru. <em className="text-gold-light">Every detail is your family's detail.</em>
            </p>

            <div className="flex gap-6 pt-4">
              {[["200+", "Events"], ["8+", "Years"], ["50+", "Unique Rituals"], ["100%", "Eco-Friendly"]].map(([num, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl gold-gradient-text">{num}</div>
                  <div className="text-cream/60 text-xs font-sans uppercase tracking-widest mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white/8 border border-gold/25 rounded-sm p-5 hover:border-gold/50 hover:bg-white/12 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
                <h4 className="font-serif text-gold-light text-base font-semibold mb-2">{v.title}</h4>
                <p className="text-cream/65 font-sans text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team note */}
        <div className="mt-16 text-center border-t border-gold/20 pt-10">
          <p className="text-cream/50 font-sans text-xs tracking-widest uppercase mb-2">Proudly based in</p>
          <p className="font-serif text-xl text-gold-light">
            Bengaluru, Karnataka · <span className="font-kannada">ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ</span>
          </p>
        </div>
      </div>
    </section>
  );
}
