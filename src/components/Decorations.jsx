// Decorative SVG components for South Indian motifs

export function MangoLeafTorana({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* String */}
      <path d="M0 15 Q200 8 400 15" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      {/* Mango leaves hanging down */}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => (
        <g key={i} transform={`translate(${x}, 14)`}>
          {/* stem */}
          <line x1="0" y1="0" x2="0" y2="6" stroke="#6B8E3B" strokeWidth="1.2" />
          {/* leaf */}
          <ellipse
            cx="0" cy="20" rx="6" ry="14"
            fill={i % 2 === 0 ? "#4A7C2F" : "#3D6B26"}
            opacity="0.85"
            transform="rotate(-8 0 20)"
          />
          {/* leaf vein */}
          <line x1="0" y1="8" x2="0" y2="32" stroke="#6B8E3B" strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      {/* Marigold flowers between leaves */}
      {[40, 120, 200, 280, 360].map((x, i) => (
        <g key={`f${i}`} transform={`translate(${x}, 14)`}>
          <circle cx="0" cy="0" r="6" fill="#FFDB58" opacity="0.9" />
          <circle cx="0" cy="0" r="3.5" fill="#D4AF37" />
        </g>
      ))}
    </svg>
  );
}

export function TempleBorder({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="tempPattern" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
          {/* Base line */}
          <rect x="0" y="10" width="40" height="2" fill="#D4AF37" opacity="0.7" />
          {/* Temple arch */}
          <path d="M12 10 Q20 2 28 10" stroke="#800000" strokeWidth="1.5" fill="none" />
          {/* Pillar dots */}
          <circle cx="12" cy="12" r="2" fill="#D4AF37" />
          <circle cx="28" cy="12" r="2" fill="#D4AF37" />
          {/* Top decoration */}
          <circle cx="20" cy="4" r="1.5" fill="#800000" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="1200" height="24" fill="url(#tempPattern)" />
    </svg>
  );
}

export function RangoliDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="flex-1 divider-temple" />
      <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
        {/* 8-petal lotus */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="24" cy="14" rx="4" ry="9"
            fill={i % 2 === 0 ? "#D4AF37" : "#800000"}
            opacity="0.75"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="5" fill="#D4AF37" />
        <circle cx="24" cy="24" r="2.5" fill="#800000" />
      </svg>
      <div className="flex-1 divider-temple" />
    </div>
  );
}

export function GopuramTopPattern({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#800000" />
          <stop offset="100%" stopColor="#5C0000" />
        </linearGradient>
      </defs>
      {/* Layered temple tiers */}
      <rect width="1200" height="80" fill="url(#gopGrad)" />
      {/* Tier decorations */}
      {Array.from({ length: 30 }, (_, i) => (
        <g key={i} transform={`translate(${i * 40}, 0)`}>
          <rect x="2" y="55" width="36" height="25" fill="#5C0000" />
          <path d="M20 20 L36 55 L4 55Z" fill="#D4AF37" opacity="0.3" />
          <circle cx="20" cy="18" r="3" fill="#FFDB58" opacity="0.5" />
        </g>
      ))}
      {/* Gold line accent */}
      <rect y="0" width="1200" height="3" fill="#D4AF37" opacity="0.8" />
      <rect y="52" width="1200" height="2" fill="#D4AF37" opacity="0.4" />
    </svg>
  );
}
