import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { LAUNCH_DATETIME } from "../config/launch";

const fireConfetti = () => {
  const colors = ["#D4AF37", "#800000", "#FFDB58", "#FFFDD0", "#FF6B35", "#FFA500"];
  const burst = (origin, angle) =>
    confetti({ particleCount: 90, spread: 70, origin, angle, colors, ticks: 320 });
  burst({ x: 0, y: 0.7 }, 60);
  setTimeout(() => burst({ x: 1, y: 0.7 }, 120), 200);
  setTimeout(() =>
    confetti({ particleCount: 180, spread: 130, origin: { x: 0.5, y: 0.4 }, colors, ticks: 440, startVelocity: 50 }),
    400
  );
  setTimeout(() => burst({ x: 0.2, y: 0.6 }, 70), 700);
  setTimeout(() => burst({ x: 0.8, y: 0.6 }, 110), 900);
  setTimeout(() =>
    confetti({ particleCount: 60, spread: 80, origin: { x: 0.3, y: 0.5 }, colors, shapes: ["circle"] }),
    1200
  );
};

function pad(n) { return String(n).padStart(2, "0"); }

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

/* Full diya SVG — flame, oil, wick, base */
function DiyaSVG({ size = 96 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Diya lamp"
    >
      {/* Outer glow */}
      <ellipse cx="50" cy="68" rx="38" ry="8" fill="rgba(255,180,0,0.18)" />

      {/* Clay body */}
      <path
        d="M18 62 Q20 82 50 84 Q80 82 82 62 Q70 58 50 57 Q30 58 18 62Z"
        fill="#c8622a"
      />
      {/* Clay highlight */}
      <path
        d="M22 63 Q23 76 50 78 Q77 76 78 63 Q66 60 50 59 Q34 60 22 63Z"
        fill="#e07a40"
      />
      {/* Oil surface */}
      <ellipse cx="50" cy="62" rx="28" ry="6" fill="#d4930a" opacity="0.7" />
      <ellipse cx="50" cy="61" rx="22" ry="4" fill="#f5b800" opacity="0.55" />

      {/* Wick */}
      <rect x="48" y="50" width="4" height="14" rx="2" fill="#8b5e3c" />

      {/* Flame outer */}
      <path
        d="M50 14 C44 22 38 30 40 40 C42 50 50 52 50 52 C50 52 58 50 60 40 C62 30 56 22 50 14Z"
        fill="url(#flameOuter)"
      />
      {/* Flame inner */}
      <path
        d="M50 22 C46 28 44 34 46 40 C47 45 50 47 50 47 C50 47 53 45 54 40 C56 34 54 28 50 22Z"
        fill="url(#flameInner)"
      />
      {/* Flame core */}
      <ellipse cx="50" cy="42" rx="4" ry="6" fill="#fff9c4" opacity="0.9" />

      {/* Spout / beak on right */}
      <path d="M78 62 Q90 58 88 50 Q84 54 78 58Z" fill="#c8622a" />
      <path d="M78 60 Q87 57 86 51 Q83 54 78 57Z" fill="#e07a40" />

      {/* Handle on left */}
      <path d="M22 62 Q10 60 12 52 Q16 56 22 59Z" fill="#c8622a" />

      <defs>
        <linearGradient id="flameOuter" x1="50" y1="14" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff6b00" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ffe066" />
        </linearGradient>
        <linearGradient id="flameInner" x1="50" y1="22" x2="50" y2="47" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="60%" stopColor="#ffcc02" />
          <stop offset="100%" stopColor="#ff9800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Countdown({ onLaunch }) {
  const target = new Date(LAUNCH_DATETIME).getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));
  const [launched, setLaunched] = useState(!timeLeft);

  const handleLaunch = useCallback(() => {
    setLaunched(true);
    fireConfetti();
    [1200, 2000, 2800, 3600].forEach((d) => setTimeout(fireConfetti, d));
    setTimeout(() => onLaunch?.(), 4000);
  }, [onLaunch]);

  useEffect(() => {
    if (launched) return;
    const id = setInterval(() => {
      const tl = getTimeLeft(target);
      if (!tl) { clearInterval(id); handleLaunch(); }
      else setTimeLeft(tl);
    }, 1000);
    return () => clearInterval(id);
  }, [target, launched, handleLaunch]);

  useEffect(() => {
    if (!timeLeft && !launched) handleLaunch();
  }, [timeLeft, launched, handleLaunch]);

  /* ── LAUNCHED SCREEN ──────────────────────────────────────────── */
  if (launched) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: "#FFFDD0" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,#800000,#D4AF37,transparent)" }} />
        <div className="space-y-5 max-w-md">
          <div className="flex justify-center"><DiyaSVG size={90} /></div>
          <h1
            className="font-display font-black tracking-widest"
            style={{ color: "#800000", fontSize: "clamp(2.5rem, 9vw, 5rem)", textShadow: "0 2px 28px rgba(128,0,0,0.2)" }}
          >
            We Are Live! 🎉
          </h1>
          <p className="font-kannada font-bold" style={{ color: "#D4AF37", fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
            ನಾವು ಆರಂಭಿಸಿದ್ದೇವೆ!
          </p>
          <div className="h-px w-40 mx-auto" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }} />
          <p className="font-serif italic font-semibold" style={{ color: "#5C0000", fontSize: "clamp(1rem, 3vw, 1.4rem)" }}>
            Torana (ತೋರಣ) Creatives is officially open.
          </p>
          <p className="font-sans font-medium" style={{ color: "#800000", fontSize: "clamp(0.85rem, 2vw, 1rem)", opacity: 0.65 }}>
            Five women. One beautiful dream. Now a reality. 🙏
          </p>
          <p className="font-sans text-xs tracking-widest uppercase" style={{ color: "#800000", opacity: 0.3 }}>
            Loading your experience…
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,#800000,#D4AF37,transparent)" }} />
      </div>
    );
  }

  /* ── COUNTDOWN SCREEN ─────────────────────────────────────────── */
  const units = [
    { label: "Days",    value: timeLeft?.days    ?? 0 },
    { label: "Hours",   value: timeLeft?.hours   ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center px-4 overflow-y-auto"
      style={{ backgroundColor: "#FFFDD0" }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,#800000,#D4AF37,transparent)" }} />

      <div className="space-y-6 max-w-lg w-full py-10">

        {/* Diya SVG — full, proper */}
        <div className="flex justify-center items-center">
          <DiyaSVG size={100} />
        </div>

        {/* Brand */}
        <div className="space-y-1">
          <div
            className="font-display font-black tracking-widest"
            style={{
              color: "#800000",
              fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
              textShadow: "0 3px 32px rgba(128,0,0,0.18)",
              letterSpacing: "0.1em",
            }}
          >
            Torana
          </div>
          <div
            className="font-kannada font-bold"
            style={{ color: "#D4AF37", fontSize: "clamp(1.6rem, 5vw, 2.4rem)" }}
          >
            ತೋರಣ
          </div>
          <div className="font-sans font-bold tracking-[0.45em] uppercase" style={{ color: "#800000", opacity: 0.42, fontSize: "0.68rem" }}>
            Creatives
          </div>
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 px-6">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,#D4AF37)" }} />
          <span style={{ color: "#D4AF37", fontSize: "1rem" }}>✦ ✦ ✦</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#D4AF37,transparent)" }} />
        </div>

        {/* Motivational message for the 5 founders */}
        <div className="space-y-2 px-2">
          <p
            className="font-serif italic font-semibold"
            style={{ color: "#5C0000", fontSize: "clamp(1rem, 3vw, 1.25rem)", lineHeight: 1.55 }}
          >
            "Five hearts, one dream — today it takes flight."
          </p>
          <p
            className="font-sans font-medium"
            style={{ color: "#800000", fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)", opacity: 0.62, lineHeight: 1.6 }}
          >
            Wishing our wonderful founders all the joy, success &amp; blessings<br />
            as Torana (ತೋರಣ) Creatives opens its doors to Bengaluru. 🌸
          </p>
        </div>

        {/* Countdown tiles */}
        <div className="flex items-start justify-center gap-2 sm:gap-3">
          {units.map(({ label, value }, i) => (
            <div key={label} className="flex items-start gap-2 sm:gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(3.8rem, 17vw, 6.5rem)",
                    height: "clamp(3.8rem, 17vw, 6.5rem)",
                    backgroundColor: "#fff8e7",
                    border: "2.5px solid #D4AF37",
                    borderTop: "5px solid #800000",
                    boxShadow: "0 4px 22px rgba(212,175,55,0.22), inset 0 1px 0 rgba(212,175,55,0.18)",
                  }}
                >
                  <span
                    className="font-display font-black tabular-nums"
                    style={{ color: "#800000", fontSize: "clamp(1.5rem, 6.5vw, 2.8rem)", lineHeight: 1 }}
                  >
                    {pad(value)}
                  </span>
                </div>
                <span
                  className="font-sans font-bold uppercase tracking-widest mt-1.5"
                  style={{ color: "#800000", opacity: 0.48, fontSize: "clamp(0.5rem, 1.4vw, 0.65rem)" }}
                >
                  {label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  className="font-display font-black select-none"
                  style={{
                    color: "#D4AF37",
                    fontSize: "clamp(1.8rem, 6.5vw, 3.2rem)",
                    marginTop: "clamp(0.4rem, 1.8vw, 1rem)",
                    lineHeight: 1,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center gap-3 px-12">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,rgba(212,175,55,0.4))" }} />
          <span style={{ color: "#D4AF37", fontSize: "0.7rem", opacity: 0.6 }}>✦</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(212,175,55,0.4),transparent)" }} />
        </div>

        {/* Launch datetime */}
        <div className="space-y-1">
          <p className="font-sans font-bold uppercase tracking-[0.3em]" style={{ color: "#800000", opacity: 0.38, fontSize: "0.6rem" }}>
            Official Launch
          </p>
          <p className="font-serif font-semibold" style={{ color: "#5C0000", fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)" }}>
            {new Date(LAUNCH_DATETIME).toLocaleString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" "}IST
          </p>
        </div>

        {/* Enter site button */}
        <div className="pt-1">
          <button
            onClick={handleLaunch}
            className="font-sans font-bold tracking-widest uppercase transition-all duration-200"
            style={{
              backgroundColor: "#800000",
              color: "#FFFDD0",
              border: "2.5px solid #D4AF37",
              padding: "0.9rem 2.8rem",
              fontSize: "clamp(0.72rem, 2vw, 0.88rem)",
              letterSpacing: "0.22em",
              boxShadow: "0 4px 22px rgba(128,0,0,0.22)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D4AF37";
              e.currentTarget.style.color = "#800000";
              e.currentTarget.style.boxShadow = "0 6px 30px rgba(212,175,55,0.38)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#800000";
              e.currentTarget.style.color = "#FFFDD0";
              e.currentTarget.style.boxShadow = "0 4px 22px rgba(128,0,0,0.22)";
            }}
          >
            🪔 &nbsp;Enter Site
          </button>
          <p className="font-sans text-xs mt-2" style={{ color: "#800000", opacity: 0.25 }}>
            Admin — click after pooja is complete
          </p>
        </div>

      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg,transparent,#D4AF37,#800000,#D4AF37,transparent)" }} />
    </div>
  );
}
