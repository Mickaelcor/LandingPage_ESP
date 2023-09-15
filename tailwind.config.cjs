/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turquoise: "#56BCB2",
        turquoise2: "#78C9C1",
        "progress-color": "#34AF1F",
        borderYellow: "#F1D463",
        borderBlue: "#387E8E",
        black: "#262626",
        chiffre: "#FF3B40",
        "bg-grey": "rgba(255, 255, 255, 0.65);",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
