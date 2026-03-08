import { useState } from "react";
import { RangoliDivider } from "./Decorations";

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
    category: "Grahapravesha",
  },
  {
    id: 3,
    // Vibrant marigold garlands — torana flower strings
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    alt: "Bright marigold garlands and flower strings for a Hindu festival",
    label: "Marigold Torana",
    category: "Floral",
  },
  {
    id: 4,
    // Colourful Kolam / Rangoli at entrance
    url: "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?w=800&q=85",
    alt: "Intricate colourful Kolam Rangoli drawn at the entrance of a South Indian home",
    label: "Entrance Kolam",
    category: "Grahapravesha",
  },
  {
    id: 5,
    // Havan / sacred fire ritual
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=85",
    alt: "Sacred Havan fire ritual with vedic priest performing homa",
    label: "Havan Ritual",
    category: "Upanayana",
  },
  {
    id: 6,
    // Traditional South Indian banana leaf feast — sadya
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=85",
    alt: "Traditional South Indian feast served on fresh banana leaves",
    label: "Banana Leaf Sadya",
    category: "Wedding",
  },
  {
    id: 7,
    // Fresh jasmine flower garlands — gajra for South Indian bride
    url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=85",
    alt: "Fresh jasmine and marigold flower garlands used in South Indian weddings",
    label: "Jasmine Garlands",
    category: "Floral",
  },
  {
    id: 8,
    // South Indian temple gopuram
    url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=85",
    alt: "Colourful South Indian temple gopuram tower with traditional sculptures",
    label: "Temple Gopuram",
    category: "Wedding",
  },
  {
    id: 9,
    // Puja offering flowers — marigold and rose petals in a brass plate
    url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=85",
    alt: "Traditional puja offering with marigold flowers and rose petals",
    label: "Puja Offerings",
    category: "Grahapravesha",
  },
];

const CATEGORIES = ["All", "Wedding", "Floral", "Grahapravesha", "Upanayana"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const filtered =
    active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);

  const handleImgError = (id) => setImgErrors((prev) => ({ ...prev, [id]: true }));

  return (
    <section id="gallery" className="py-20 bg-cream border-temple-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold font-sans">
            Our Work
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-maroon mt-2 heading-underline">
            Moments We&apos;ve Crafted
          </h2>
          <p className="text-maroon/60 font-sans mt-6 max-w-xl mx-auto text-sm leading-relaxed">
            A glimpse into the traditions, colours, and joy that Torana (ತೋರಣ) Creatives
            brings to every celebration in Bengaluru.
          </p>
        </div>

        <RangoliDivider className="mb-8" />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm border transition-all duration-200 ${
                active === cat
                  ? "bg-maroon text-cream border-maroon"
                  : "border-gold/50 text-maroon hover:bg-maroon hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-sm cursor-pointer group shadow-gold hover:shadow-gold-lg transition-all duration-300 ${
                idx === 0 ? "col-span-2 sm:col-span-2" : ""
              }`}
              onClick={() => setLightbox(item)}
              style={{ aspectRatio: idx === 0 ? "16/9" : "4/3" }}
            >
              {imgErrors[item.id] ? (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-2"
                  style={{ backgroundColor: "#fff8e7", border: "1px solid #D4AF37" }}
                >
                  <span className="text-4xl">📸</span>
                  <p className="font-sans text-xs text-maroon/50 text-center px-3">Your photo here</p>
                  <p className="font-sans text-xs text-gold/70 text-center px-3">{item.label}</p>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={() => handleImgError(item.id)}
                />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-mustard text-xs uppercase tracking-widest font-semibold">{item.category}</span>
                  <p className="text-cream font-serif text-base mt-0.5">{item.label}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Owner hint */}
        <div className="mt-10 text-center">
          <p className="font-sans text-xs text-maroon/35 italic">
            💡 Drop event photos into <code className="bg-gold/10 px-1 rounded">public/gallery/</code> and update <code className="bg-gold/10 px-1 rounded">Gallery.jsx</code> with your real images.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-maroon/60 font-sans text-sm mb-4">
            Want to see your event featured here?
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
          >
            ✦ Start Planning
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-sm overflow-hidden shadow-gold-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url.replace("w=800", "w=1400")}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain bg-maroon-dark"
            />
            <div className="bg-maroon px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-mustard text-xs uppercase tracking-widest">{lightbox.category}</span>
                <p className="text-cream font-serif text-lg">{lightbox.label}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-gold hover:text-cream text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
