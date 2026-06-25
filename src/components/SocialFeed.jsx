import { useEffect } from "react";
import { INSTAGRAM_HANDLE, FACEBOOK_PAGE, FACEBOOK_ENABLED, BEHOLD_FEED_ID } from "../config/launch";

// ─────────────────────────────────────────────────────────────
//  Social Feed Section
//  Instagram live feed: set VITE_BEHOLD_FEED_ID in Vercel env.
//    1. Sign up free at behold.so
//    2. Connect your Instagram Business account (@torana_creatives)
//    3. Create a feed widget → copy the Feed ID
//    4. Add VITE_BEHOLD_FEED_ID=<your-id> to Vercel env vars
//  When VITE_BEHOLD_FEED_ID is empty, shows a profile link card.
// ─────────────────────────────────────────────────────────────

function BeholdFeed({ feedId }) {
  useEffect(() => {
    if (!feedId) return;
    const existing = document.getElementById("behold-widget-script");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "behold-widget-script";
    script.src = "https://w.behold.so/widget.js";
    script.defer = true;
    document.head.appendChild(script);
  }, [feedId]);

  if (!feedId) return null;

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
      <div className="flex items-center gap-3 px-5 py-4"
        style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span className="font-sans font-bold text-white text-sm tracking-wider">@{INSTAGRAM_HANDLE}</span>
        <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noopener noreferrer"
          className="ml-auto text-white/80 hover:text-white text-xs font-sans tracking-wider transition-colors">
          Follow →
        </a>
      </div>
      <div className="p-4" style={{ background: "rgba(10,0,0,0.6)" }}>
        <div id={`BeholdWidget-${feedId}`} />
      </div>
    </div>
  );
}

function InstagramCard({ handle }) {
  return (
    <a
      href={`https://www.instagram.com/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/50 transition-all duration-300 block"
      style={{ background: "linear-gradient(135deg,#1a0000,#3d0000)" }}
    >
      <div className="h-28 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
        <svg viewBox="0 0 24 24" className="w-14 h-14 fill-white opacity-90">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
      <div className="p-6 text-center space-y-3">
        <p className="font-sans font-bold text-gold tracking-widest text-sm uppercase">@{handle}</p>
        <p className="text-cream/60 font-sans text-sm leading-relaxed">
          Follow us for behind-the-scenes ceremony preparations, floral décor, and real event moments.
        </p>
        <span className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider text-white transition-all group-hover:scale-105"
          style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
          Follow on Instagram
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/></svg>
        </span>
      </div>
    </a>
  );
}

function FacebookCard({ page }) {
  return (
    <a
      href={`https://www.facebook.com/${page}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/50 transition-all duration-300 block"
      style={{ background: "linear-gradient(135deg,#1a0000,#3d0000)" }}
    >
      <div className="h-28 flex items-center justify-center" style={{ background: "#1877f2" }}>
        <svg viewBox="0 0 24 24" className="w-14 h-14 fill-white opacity-90">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
      <div className="p-6 text-center space-y-3">
        <p className="font-sans font-bold text-gold tracking-widest text-sm uppercase">{page}</p>
        <p className="text-cream/60 font-sans text-sm leading-relaxed">
          Like our Facebook page for event updates, offers, and community stories.
        </p>
        <span className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-wider text-white transition-all group-hover:scale-105"
          style={{ background: "#1877f2" }}>
          Follow on Facebook
        </span>
      </div>
    </a>
  );
}

export default function SocialFeed() {
  const showFacebook = FACEBOOK_ENABLED && FACEBOOK_PAGE;
  const hasBeholdFeed = Boolean(BEHOLD_FEED_ID);

  return (
    <section id="social" className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0f0000 0%,#300000 40%,#1a0000 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="text-mustard text-xs tracking-[0.35em] uppercase font-semibold font-sans">Stay Connected</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream mt-3 mb-4">Follow Our Journey</h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-cream/50 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Real moments, real ceremonies, real families — follow us for daily inspiration from our events.
          </p>
        </div>

        {hasBeholdFeed ? (
          <BeholdFeed feedId={BEHOLD_FEED_ID} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <InstagramCard handle={INSTAGRAM_HANDLE} />
            {showFacebook && <FacebookCard page={FACEBOOK_PAGE} />}
          </div>
        )}

        {!hasBeholdFeed && (
          <p className="text-center text-cream/20 font-sans text-xs mt-8 max-w-md mx-auto leading-relaxed">
            To show your actual Instagram posts here, set <code className="bg-white/5 px-1 rounded">VITE_BEHOLD_FEED_ID</code> in Vercel env vars after creating a free feed at <span className="text-gold/40">behold.so</span>.
          </p>
        )}
      </div>
    </section>
  );
}
