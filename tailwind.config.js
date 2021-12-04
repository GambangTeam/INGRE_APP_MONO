const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    // enabled: process.env.TAILWIND_MODE === 'build',
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      purple: colors.purple,
      green: colors.green,
      emerald: colors.emerald,
      orange: colors.orange,
      dark: "#FF6838",
      primary: "#F58634",
      secondary: "#ff8238",
    },
    container: {
      padding: "2rem",
    },
    fontFamily: {
      nunito: ["Nunito"], // ! find out why this fontFamily still not register to the styles.css inside the public -o output folder.
    },
  },
  variants: {},
  plugins: [],
};
