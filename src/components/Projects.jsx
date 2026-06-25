import { useRef, useEffect, useState } from "react";

const PROJECTS = [
  {
    id: "TC_01",
    title: "Shashi's Engagement",
    eventType: "Engagement Ceremony",
    icon: "💍",
    location: "Subramanya Matt, Bengaluru",
    year: "2025",
    description: "A beautifully woven engagement ceremony steeped in South Indian tradition — every ritual a thread in a lifelong memory.",
    grad: "from-[#2d0000] to-[#5c0000]",
    accent: "#D4AF37",
  },
  {
    id: "TC_02",
    title: "Gruhapravesha at Pine 1702",
    eventType: "Housewarming",
    icon: "🏠",
    location: "Bengaluru",
    year: "2025",
    description: "Sacred kolam, floral torana, and Vedic blessings brought a new home to life — not just a house, but a memory.",
    grad: "from-[#1a1a2e] to-[#16213e]",
    accent: "#fde68a",
  },
  {
    id: "TC_03",
    title: "Mahesh's Home Blessing",
    eventType: "Housewarming",
    icon: "🪔",
    location: "Bengaluru",
    year: "2025",
    description: "An intimate Gruhapravesha filled with the warmth of diyas, the fragrance of flowers, and the joy of family.",
    grad: "from-[#1a2a00] to-[#2d4a00]",
    accent: "#86efac",
  },
  {
    id: "TC_04",
    title: "Traditional Engagement",
    eventType: "Engagement Ceremony",
    icon: "💐",
    location: "Bengaluru",
    year: "2025",
    description: "A joyful union of two families, celebrated with full South Indian customs, vibrant décor, and heartfelt moments.",
    grad: "from-[#00152d] to-[#001a3d]",
    accent: "#93c5fd",
  },
  {
    id: "TC_05",
    title: "Dhanvi's Birthday Celebration",
    eventType: "Birthday",
    icon: "🎂",
    location: "Tumkur",
    year: "2025",
    description: "A vibrant birthday bash with fun activities and thoughtful décor that left the birthday child glowing with happiness.",
    grad: "from-[#1a0030] to-[#300060]",
    accent: "#d8b4fe",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4 transition-all duration-700 hover:scale-[1.02] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.grad}`} />
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px 0 ${project.accent}20` }} />

      <div className="relative z-10 flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${project.accent}18`, border: `1.5px solid ${project.accent}40` }}>
          {project.icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}>
            {project.id}
          </span>
          <span className="text-[10px] font-sans font-bold tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: "rgba(100,200,100,0.15)", color: "#86efac", border: "1px solid rgba(100,200,100,0.3)" }}>
            ✓ Completed
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1">
        <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: project.accent }}>
          {project.eventType}
        </p>
        <h3 className="font-serif text-lg sm:text-xl text-white font-semibold leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-white/50 font-sans text-xs mb-4">
          📍 {project.location}&nbsp;·&nbsp;{project.year}
        </p>
        <p className="font-sans text-sm text-white/65 leading-relaxed italic">
          "{project.description}"
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0a0000 0%,#200000 40%,#0a0000 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">Portfolio</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">Our Completed Projects</h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-cream/50 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            We don't just create decorations — we create memories. Here are the families we've had the honour of serving.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-14">
          {[
            { num: PROJECTS.length, label: "Projects Completed", icon: "✦" },
            { num: 2, label: "Weddings & Engagements", icon: "💍" },
            { num: PROJECTS.length, label: "Happy Families", icon: "🙏" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl gold-gradient-text font-bold">{icon} {num}</div>
              <div className="text-cream/35 text-[11px] uppercase tracking-widest font-sans mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
