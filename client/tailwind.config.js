const colors = require("tailwindcss/colors");

module.exports = {
    mode: "jit",
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                lime: colors.lime,
                teal: colors.teal,
            },
            maxHeight: {
                "3/4": "75%",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};