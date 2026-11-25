/**
 * Rebuild Sports & Fitness Center design system.
 *
 * "Forge floor": the page is the gym at night — near-black rubber flooring,
 * raw steel panels, chalk-white type and the safety-orange of the logo used
 * like marking tape. A turf-blue accent is lifted from the sprint track.
 *
 * Type is condensed, uppercase and set tight, the way it is painted on a gym
 * wall; body copy stays in Inter so it is still readable on a phone. Nothing
 * is rounded and nothing is soft — hairlines, hard cuts and diagonal marks
 * instead of cards floating on shadows.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#08090A', // page ground — rubber floor
        iron: '#0E1013', // section ground
        steel: '#15181C', // raised surfaces, cards
        smoke: '#1E2228', // fills, inert blocks
        'smoke-light': '#282D34',

        forge: {
          50: '#FFF4EA',
          100: '#FFE4CB',
          200: '#FFC795',
          300: '#FF9F52',
          400: '#FF7A1A', // the logo orange
          500: '#F26A08',
          600: '#CC5200', // AA on white
          700: '#A14000',
        },

        turf: {
          100: '#DCE4FF',
          300: '#5B7DFF',
          400: '#3359F0',
          500: '#1F45DA', // sampled from the sprint track
          600: '#1736A8',
          700: '#12297E',
        },

        chalk: '#F3F4EF', // primary text
        ash: '#A2A8AE', // secondary text
        dust: '#6C737A', // tertiary text

        blood: {
          500: '#C0392B',
          600: '#99291D',
          700: '#731D14',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['Inter', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        micro: '0.26em',
        wide2: '0.14em',
        tightest: '-0.03em',
      },
      borderRadius: {
        none: '0',
        xs: '1px',
        sm: '2px',
      },
      backgroundImage: {
        hazard:
          'repeating-linear-gradient(-45deg, #FF7A1A 0 10px, transparent 10px 22px)',
        'floor-grid':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'forge-glow':
          'radial-gradient(80% 60% at 12% 0%, rgba(255,122,26,0.16) 0%, rgba(8,9,10,0) 65%)',
        'turf-streak':
          'linear-gradient(90deg, rgba(31,69,218,0) 0%, rgba(31,69,218,0.55) 45%, rgba(255,122,26,0.9) 100%)',
      },
      boxShadow: {
        lift: '0 30px 60px -40px rgba(0,0,0,0.95)',
        forge: '0 22px 50px -30px rgba(255,122,26,0.65)',
        hard: '6px 6px 0 0 rgba(255,122,26,1)',
        'hard-chalk': '6px 6px 0 0 rgba(243,244,239,0.9)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.02) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(-1%,-1.5%,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(900%)' },
        },
        'pulse-bar': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 10s ease-out both',
        marquee: 'marquee 28s linear infinite',
        'pulse-bar': 'pulse-bar 2.4s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in': 'slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
