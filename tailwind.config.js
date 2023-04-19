/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#FF4125',
      gray: '#A0A4B0',
      white: 'white',
      black: 'black',
      'black-o-50': 'rgba(255, 255, 255, 0.5)',
      'gray-o-20': 'rgba(42, 42, 42, 0.8)',
      'gray-title': '#465358',
    },
    extend: {
      backgroundColor: {
        'black-80': '#000C',
        'black-20': 'rgba(255, 255, 255, 0.2)',
        footer: '#465358',
      },
      // margin: {
      //   '100'
      // }
    },
  },
  plugins: [],
};
