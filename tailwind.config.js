module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cold': "url('img/cold.svg')",
      },
      fontFamily: {
        'ubunto': ["'Ubuntu'", 'sans-serif']
      }
    },
  },
  plugins: [],
}
