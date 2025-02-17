/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const genFontSizes = (obj) =>
    Object.entries(obj).reduce(
        (acc, val) => ({
            ...acc,
            [val[0]]: [
                val[1][0],
                {
                    lineHeight: val[1][1],
                    letterSpacing: val[1][2],
                    fontWeight: val[1][3],
                },
            ],
        }),
        {},
    );

module.exports = {
    content: [
        "./layouts/**/*.{html,css,js,md}",
        "./content/**/*.md",
        "./hugo_stats.json",
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ["Inter", "sans-serif"],
                display: ["Averia Serif Libre", "serif"],
                button: ["Orbitron", "sans-serif"],
            },
            fontSize: genFontSizes({
                h1: ["3.5rem", "1.2", "-0.3%", "400"],
                h2: ["2.5rem", "1.2", "-0.3%", "400"],
                h3: ["1.5rem", "2rem", "-0.01rem", "300"],
                subheading: ["1rem", "2rem", "-0.01rem", "400"],
                body: ["1rem", "1", "1", "400"],
            }),
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
};
