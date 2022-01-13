module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cold': "url('img/cold.svg')",
        'coldText': "linear-gradient(90deg, rgba(18,25,172,0.8950437317784257) 0%, rgba(37,198,231,0.9037900874635568) 74%)"
      },
      fontFamily: {
        'ubunto': ["'Ubuntu'", 'sans-serif']
      }
    },
  },
  plugins: [],
}
