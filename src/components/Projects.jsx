import { useRef, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
//  PROJECTS — TC_1 through TC_5
//  Update the PROJECTS array with actual event details.
//  Send feedback URLs to customers:
//    https://toranacreatives.in/?feedback=TC_1
// ─────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "TC_1",
    title: "Traditional South Indian Wedding",
    eventType: "Vedic Wedding",
    icon: "🪔",
    location: "Bengaluru",
    year: "2025",
    highlights: ["Muhurtham planning", "Mantapa décor", "Full ritual coordination"],
    grad: "from-[#2d0000] to-[#5c0000]",
    accent: "#D4AF37",
  },
  {
    id: "TC_2",
    title: "Gruhapravesha Ceremony",
    eventType: "Housewarming",
    icon: "🏠",
    location: "Bengaluru",
    year: "2025",
    highlights: ["Rangoli & kolam art", "Torana entrance", "Puja room setup"],
    grad: "from-[#1a2a00] to-[#2d4a00]",
    accent: "#86efac",
  },
  {
    id: "TC_3",
    title: "Sacred Thread Ceremony",
    eventType: "Upanayana",
    icon: "🧵",
    location: "Bengaluru",
    year: "2025",
    highlights: ["Vedic ritual management", "Pandit coordination", "Floral décor"],
    grad: "from-[#00152d] to-[#001a3d]",
    accent: "#93c5fd",
  },
  {
    id: "TC_4",
    title: "Birthday Celebration",
    eventType: "Birthday",
    icon: "🎂",
    location: "Bengaluru",
    year: "2025",
    highlights: ["Theme decoration", "Balloon & floral setup", "Cake ceremony"],
    grad: "from-[#1a0030] to-[#300060]",
    accent: "#d8b4fe",
  },
  {
    id: "TC_5",
    title: "60th Birthday Milestone",
    eventType: "Shashtipoorthi",
    icon: "🙏",
    location: "Bengaluru",
    year: "2025",
    highlights: ["Vedic Saptapadi renewal", "Pada Pooja ceremony", "Traditional décor"],
    grad: "from-[#001a1a] to-[#003030]",
    accent: "#5eead4",
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

  const feedbackUrl = `${window.location.origin}/?feedback=${project.id}`;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4 transition-all duration-700 hover:scale-[1.02] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.grad}`} />
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px 0 ${project.accent}20` }} />

      {/* Project badge */}
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

      {/* Content */}
      <div className="relative z-10 flex-1">
        <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: project.accent }}>
          {project.eventType}
        </p>
        <h3 className="font-serif text-lg sm:text-xl text-white font-semibold leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-white/50 font-sans text-xs mb-4">
          📍 {project.location} &nbsp;·&nbsp; {project.year}
        </p>
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {project.highlights.map((h) => (
            <li key={h} className="text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: `${project.accent}12`, color: `${project.accent}cc`, border: `1px solid ${project.accent}25` }}>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback link */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <p className="text-white/35 font-sans text-[11px] mb-2">Send feedback link to client:</p>
        <div className="flex items-center gap-2">
          <code className="text-[11px] font-mono text-white/50 bg-white/5 rounded px-2 py-1 flex-1 truncate">
            {feedbackUrl}
          </code>
          <button
            onClick={() => navigator.clipboard?.writeText(feedbackUrl).catch(() => {})}
            className="flex-shrink-0 text-[11px] font-sans font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
            style={{ background: `${project.accent}25`, color: project.accent, border: `1px solid ${project.accent}40` }}
            title="Copy feedback link">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0a0000 0%,#200000 40%,#0a0000 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">Portfolio</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">Our Completed Projects</h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-cream/50 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Each project is tracked with a unique ID. Click "Copy" to send the feedback link to your client.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-14">
          {[
            { num: PROJECTS.length, label: "Projects Completed", icon: "✦" },
            { num: PROJECTS.filter(p => p.eventType === "Vedic Wedding").length, label: "Weddings", icon: "🪔" },
            { num: PROJECTS.length, label: "Happy Families", icon: "🙏" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl gold-gradient-text font-bold">{icon} {num}</div>
              <div className="text-cream/35 text-[11px] uppercase tracking-widest font-sans mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Info note */}
        <div className="mt-12 text-center">
          <p className="text-cream/25 font-sans text-xs max-w-lg mx-auto leading-relaxed">
            Project IDs (TC_1 etc.) are used to link gallery photos, customer feedback, and event records.
            Photos named <code className="bg-gold/10 px-1 rounded">TC_1_photo.jpg</code> will automatically appear in the gallery under the correct project.
          </p>
        </div>
      </div>
    </section>
  );
}
