module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: 'Rubik',
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [],
}
