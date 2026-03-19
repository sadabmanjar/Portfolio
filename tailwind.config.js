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
    },
  },
  plugins: [],
}
