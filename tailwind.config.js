/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon:         '#800000',
        mustard:        '#FFDB58',
        gold:           '#D4AF37',
        cream:          '#FFFDD0',
        'gold-light':   '#F5D78E',
        'maroon-light': '#A52828',
        'maroon-dark':  '#5C0000',
      },
      fontFamily: {
        // Western headings / body — swap here in future
        serif:    ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:     ['"Plus Jakarta Sans"', 'sans-serif'],
        // Kannada script — swap here in future to any Kannada font
        kannada:  ['"Noto Sans Kannada"', '"Noto Serif Kannada"', 'sans-serif'],
        display:  ['"Cinzel Decorative"', '"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.8s ease-out forwards',
        'fade-in-up':  'fadeInUp 0.9s ease-out forwards',
        'float':       'float 4s ease-in-out infinite',
        'pulse-gold':  'pulseGold 2s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp:  { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGold: { '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(212,175,55,0)' } },
      },
      boxShadow: {
        'gold':    '0 4px 24px 0 rgba(212,175,55,0.25)',
        'gold-lg': '0 8px 48px 0 rgba(212,175,55,0.35)',
        'maroon':  '0 4px 24px 0 rgba(128,0,0,0.20)',
      },
    },
  },
  plugins: [],
}


