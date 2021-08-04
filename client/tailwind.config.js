const colors = require("tailwindcss/colors");

module.exports = {
    important: true,
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
                indigo: colors.indigo,
                rose: colors.rose,
                lightgray: "rgb(30,42,57)",
                violet: "#AF8494",
            },
            maxHeight: {
                "3/4": "75%",
            },
            minWidth: {
                xxs: "280px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};