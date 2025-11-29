/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-yellow': '#FFFF00',
        'hot-pink': '#FF00FF',
        'electric-cyan': '#00FFFF',
        'neon-green': '#00FF00',
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
        'black': ['"Archivo Black"', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px 0px #000',
        'brutal': '5px 5px 0px 0px #000',
        'brutal-lg': '8px 8px 0px 0px #000',
        'brutal-hover': '3px 3px 0px 0px #000',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
      },
    },
  },
  plugins: [],
}
