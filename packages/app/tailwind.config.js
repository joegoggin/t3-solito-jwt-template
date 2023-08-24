// @ts-check

const { theme } = require("app/ui/tailwind/theme");

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
    content: ["./**/*.{js,jsx,ts,tsx}"],
    theme: {
        ...theme,
    },
    plugins: [],
};
