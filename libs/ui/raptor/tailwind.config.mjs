const workspacePreset = require('../../../tailwind-workspace-preset.mjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [workspacePreset],
  theme: {
    extend: {},
  },
  plugins: [],
};