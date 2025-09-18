/** @type {import('tailwindcss').Config} */
import relumeTailwindPreset from "@relume_io/relume-tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [relumeTailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}