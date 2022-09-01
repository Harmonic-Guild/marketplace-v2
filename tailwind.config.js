/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: "390px",
            // => @media (min-width: 390px) { ... }
            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                "mp-dark": {
                    1: "#252B42",
                    2: "#161621",
                    3: "#0F0F1C",
                },
                "mp-gray": {
                    1: "#F9F9F9",
                    2: "#F5F4FB",
                    3: "#C7C8D8",
                    4: "#737373",
                    5: "#272E46",
                    6: "#223354",
                    7: "#0A142F",
                },
                "mp-orange": {
                    1: "#FF902B",
                    2: "#FFBD1C",
                },
                "mp-brown": {
                    1: "#BF9861",
                    2: "#AA5F2A",
                },
                "mp-peach": {
                    1: "#FDFBFF",
                    2: "#FFF8E9",
                },
                "mp-blue": {
                    1: "#5533FF",
                    2: "#6E80FF",
                },
                "mp-light": {
                    1: "#FAFAFA",
                },
                "actionBtn-Yellow": {
                    1: "#FFD12F",
                },
                "actionBtn-Orange": {
                    1: "#FFB038",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
