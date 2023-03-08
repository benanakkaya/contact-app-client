
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1d1d1d",
        primary: "#2c3e50",
        lightBlue: "#34495e",
        darkBlue: "#1f2a38",
        customRed: "#e74c3c",
        body: "#3498db",
        border: "#ffffff"
      },
      fontFamily:{
        roboto: ['Roboto', 'sans-serif']
      },
      container:{
        center:true
      },
      width:{
        120: "30rem"
      }
    },
  },
  plugins: [],
}