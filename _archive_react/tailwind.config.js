/**
 * @intent Tailwind configuration with Goobit palette, typography, keyframes, and spring animation curves
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Goobit Authentic CI Color Palette
        'goobit-navy': '#162846',
        'goobit-navyDark': '#0E1A30',
        'goobit-navyLight': '#1A2E51',
        'goobit-amber': '#F5A623',
        'goobit-amberHover': '#E09210',
        'goobit-blue': '#2563EB',

        goobit: {
          navy: '#162846',
          navyDark: '#0E1A30',
          navyLight: '#1A2E51',
          navyMuted: '#2A4365',
          amber: '#F5A623',
          amberHover: '#E09210',
          amberLight: '#FEF3C7',
          blue: '#2563EB',
          blueHover: '#1D4ED8',
        },
        navy: {
          950: '#0E1A30',
          900: '#162846',
          850: '#1A2E51',
          800: '#1E3A5F',
          700: '#2A4365',
          600: '#334155',
        },
        ai: {
          cyan: '#F5A623',
          cyanLight: '#FBBF24',
          blue: '#2563EB',
          indigo: '#1D4ED8',
          glow: 'rgba(245, 166, 35, 0.12)',
        },
        surface: {
          white: '#FFFFFF',
          section: '#F8FAFC',
          card: '#F1F5F9',
          border: '#E2E8F0',
          slate: '#0F172A',
        },
        content: {
          heading: '#0F172A',
          body: '#334155',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        mono: ['Pretendard', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        'enterprise': '0 4px 20px -2px rgba(22, 40, 70, 0.06), 0 2px 6px -1px rgba(22, 40, 70, 0.04)',
        'enterprise-lg': '0 12px 32px -4px rgba(22, 40, 70, 0.1), 0 4px 12px -2px rgba(22, 40, 70, 0.06)',
        'amber-soft': '0 8px 24px -4px rgba(245, 166, 35, 0.28)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(22, 40, 70, 0.1), 0 8px 10px -6px rgba(22, 40, 70, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'spring-apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
