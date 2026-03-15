import { useEffect, useRef, useState } from "react";

const STATS = [
  { num: 200, suffix: "+", label: "Events Completed" },
  { num: 8,   suffix: "+", label: "Years of Expertise" },
  { num: 50,  suffix: "+", label: "Unique Rituals" },
  { num: 100, suffix: "%", label: "Eco-Friendly" },
];

const VALUES = [
  { icon: "🪷", title: "Rooted in Tradition",   desc: "Every ritual honours centuries of South Indian heritage." },
  { icon: "🌿", title: "Eco-Friendly First",     desc: "Banana leaves over plastic, clay over synthetic — always." },
  { icon: "💛", title: "Family-Centred Care",    desc: "We treat your event like our own family celebration." },
  { icon: "✨", title: "Aesthetic Precision",    desc: "From the kolam at the entrance to the last marigold petal." },
];

function CountUp({ target, suffix, active }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{val}{suffix}</>;
}

export default function About() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#1a0000 0%,#5c0000 50%,#2d0000 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">Who We Are</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">
            About Torana <span className="font-kannada text-gold-light">(ತೋರಣ)</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Story */}
          <div className="space-y-6">
            <blockquote className="relative border-l-2 border-gold/60 pl-6">
              <span className="absolute -top-6 -left-2 text-gold/15 font-serif text-[7rem] leading-none select-none">"</span>
              <p className="font-serif text-xl sm:text-2xl text-gold-light italic leading-relaxed">
                We don't just decorate events. We recreate the traditions your grandparents cherished, for the next generation to remember.
              </p>
            </blockquote>

            <p className="text-cream/70 font-sans text-sm sm:text-base leading-relaxed">
              Born in Bengaluru, <strong className="text-gold">Torana (ತೋರಣ) Creatives</strong> was founded with one purpose: to keep South Indian cultural events as authentic, joyful, and spiritually meaningful as they have always been.
            </p>
            <p className="text-cream/70 font-sans text-sm sm:text-base leading-relaxed">
              Our team of event planners, floral artists, and Vedic ritual coordinators has managed over <strong className="text-mustard">200+ events</strong> across Bengaluru, Mysuru, and beyond — from intimate Grahapravesha ceremonies to grand multi-day weddings with 1000+ guests.
            </p>
            <p className="text-cream/70 font-sans text-sm sm:text-base leading-relaxed">
              We respect each family's regional customs — Brahmin rituals of Mysuru, Vokkaliga traditions of rural Karnataka, Tamil Iyer customs. <em className="text-gold-light">Every detail is your family's detail.</em>
            </p>

            {/* Stats */}
            <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {STATS.map(({ num, suffix, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <div className="font-display text-2xl sm:text-3xl gold-gradient-text font-bold">
                    <CountUp target={num} suffix={suffix} active={active} />
                  </div>
                  <div className="text-cream/50 text-xs font-sans uppercase tracking-widest mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="rounded-xl p-6 group hover:scale-[1.03] transition-transform duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
                <h4 className="font-serif text-gold-light text-base font-semibold mb-2">{v.title}</h4>
                <p className="text-cream/60 font-sans text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location footer */}
        <div className="mt-16 text-center border-t border-gold/15 pt-10">
          <p className="text-cream/40 font-sans text-xs tracking-widest uppercase mb-2">Proudly based in</p>
          <p className="font-serif text-xl text-gold-light">
            Bengaluru, Karnataka · <span className="font-kannada">ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ</span>
          </p>
        </div>
      </div>
    </section>
  );
}
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
