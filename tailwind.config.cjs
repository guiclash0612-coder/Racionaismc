module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'bg-dark': '#0a0a0a',
        card: '#0f0f0f',
        'card-hover': '#151515',
        red: '#B30000',
        'red-dark': '#8B0000',
        'red-light': '#FF0000',
        'gray-lead': '#111111',
        'white-cream': '#F5F5F5',
      },
      fontFamily: {
        heading: ['Wednesday', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    }
  },
  plugins: []
}
