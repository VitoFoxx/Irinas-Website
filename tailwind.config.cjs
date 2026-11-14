/** Build-time config for the static Tailwind CSS bundle (styles/tailwind.css). */
module.exports = {
  content: ['./*.html', './perfect-line/*.html', './bridal-looks/*.html', './scripts/*.js'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3ED',
        champagne: '#E8DCCE',
        taupe: '#B9A99A',
        // Taupe itself is too light for text (2.1:1 on ivory); this deeper shade passes WCAG AA.
        'taupe-deep': '#776859',
        espresso: '#35302D',
        'espresso-soft': '#5F5752',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '.28em',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.65,0,.35,1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
