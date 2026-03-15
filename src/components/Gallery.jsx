import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  GALLERY — fully automatic
//  1. Drop images/videos into  public/gallery/
//  2. Run:  npm run gallery   (generates public/gallery/manifest.json)
//  3. Push to main — GitHub Actions runs the script & deploys
//  No manual edits needed here ever again.
// ─────────────────────────────────────────────────────────────

const EXT_IMAGE = ["jpg", "jpeg", "png", "webp", "avif", "gif"];
const EXT_VIDEO = ["mp4", "webm", "mov"];

function isVideo(filename) {
  return EXT_VIDEO.includes(filename.split(".").pop().toLowerCase());
}

function MediaCard({ item, onClick, index }) {
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
      className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ aspectRatio: "4/3", transitionDelay: `${(index % 6) * 60}ms` }}
      onClick={() => onClick(item)}
    >
      {item.type === "video" ? (
        <video
          src={item.url}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          muted playsInline preload="metadata"
        />
      ) : (
        <img
          src={item.url}
          alt={item.label || "Torana Creatives event"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-serif text-sm">{item.label || item.filename}</p>
      </div>
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [filter,   setFilter]   = useState("All");

  useEffect(() => {
    fetch("/gallery/manifest.json")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">Our Work</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon-dark mt-3 mb-4">Event Gallery</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-maroon/60 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Moments we've had the honour of crafting. Every photo tells a family's story.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-5 py-2 font-sans text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200"
                style={
                  filter === cat
                    ? { background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }
                    : { background: "transparent", color: "#800000", border: "1.5px solid rgba(212,175,55,0.5)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-maroon/40 font-sans text-sm">Loading gallery…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="font-serif text-xl text-maroon/60 mb-2">Gallery coming soon</p>
            <p className="font-sans text-xs text-maroon/35 italic">
              Drop images/videos into <code className="bg-gold/10 px-1 rounded">public/gallery/</code> and run <code className="bg-gold/10 px-1 rounded">npm run gallery</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <MediaCard key={item.url} item={item} onClick={setLightbox} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && (
          <div className="text-center mt-12">
            <p className="text-maroon/55 font-sans text-sm mb-4">Want your event featured here?</p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 font-sans font-semibold text-sm tracking-wider uppercase rounded-sm transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#D4AF37,#c9991e)", color: "#1a0000" }}
            >
              ✦ Book Your Event
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none z-10" onClick={() => setLightbox(null)}>×</button>
          <div className="max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" ? (
              <video src={lightbox.url} controls autoPlay className="w-full max-h-[85vh] rounded-xl" />
            ) : (
              <img src={lightbox.url} alt={lightbox.label || ""} className="w-full max-h-[85vh] object-contain rounded-xl" />
            )}
            {lightbox.label && (
              <p className="text-white/80 font-serif text-base text-center mt-3">{lightbox.label}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  GALLERY IMAGES
//  All photos are Hindu / South Indian traditional ceremonies.
//  TO ADD YOUR OWN PHOTOS:
//    1. Drop images into  public/gallery/  e.g. public/gallery/wedding-01.jpg
//    2. Replace the `url` value with "/gallery/wedding-01.jpg"
//    3. The site will serve them directly — no rebuild needed.
// ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    id: 1,
    url: "/gallery/image1.png",
    alt: "Torana Creatives event photo 1",
    label: "Our Work",
    category: "Wedding",
  },
  {
    id: 2,
    url: "/gallery/image2.jpg",
    alt: "Torana Creatives event photo 2",
    label: "Our Work",
    category: "Gruhapravesha",
  },
];

const CATEGORIES = ["All", "Wedding", "Floral", "Gruhapravesha", "Upanayana"];
