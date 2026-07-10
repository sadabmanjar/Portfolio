/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cyber-black': '#050508',
        'cyber-cyan': '#00f5ff',
        'cyber-purple': '#bf00ff',
        'cyber-red': '#ff003c',
        'cyber-dim': '#0d0d14',
        'cyber-muted': '#4a5568',
        // Responsive Colors
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'muted': 'var(--text-muted)',
        'bg-main': 'var(--bg-primary)',
        'bg-card': 'var(--bg-card)',
        'bg-alt': 'var(--bg-alt)',
        'border-main': 'var(--border-color)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-purple': 'var(--accent-purple)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,245,255,0.35)',
        'neon-purple': '0 0 20px rgba(191,0,255,0.35)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slow-reverse': 'spin-reverse 20s linear infinite',
        'spin-reverse-fast': 'spin-reverse 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'translate(-50%, -50%) rotate(360deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        spin: {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', transform: 'translate(-50%, -50%) scale(1)', boxShadow: '0 0 20px rgba(0,245,255,0.4)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.02)', boxShadow: '0 0 40px rgba(0,245,255,0.8)' },
        }
      }
    },
  },
  plugins: [],
}
