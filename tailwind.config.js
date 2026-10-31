/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: { ink:'#07111F', navy:'#0B1B33', navy2:'#13294B', orange:'#F07000', gold:'#FFB800', cream:'#F4F2EE' },
      fontFamily: { display: ['Anton','Impact','sans-serif'], sans: ['Inter','Arial','sans-serif'] },
    },
  },
  plugins: [],
}
