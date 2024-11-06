export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(11rem)' },
        },
      },
      animation: {
        'spin-move': 'move 5s ease-in-out infinite', 
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
