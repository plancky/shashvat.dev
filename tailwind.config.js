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
                "2xl": ["3.5rem", "1.2", "-0.3%", "400"],
                "xl": ["3rem", "1.2", "-0.3%", "400"],
                lg: ["2.5rem", "1.2", "-0.3%", "400"],
                md: ["2rem", "1", "-0.3%", "400"],
                subheading: ["1.2rem", "1.4", "1", "300"],
                body: ["1rem", "1.4", "1", "400"],
            }),
            colors: {
                background: "hsl(var(--background) / var(--tw-bg-opacity))",
                foreground: "hsl(var(--foreground) / var(--tw-text-opacity))",
                card: {
                    DEFAULT: "hsl(var(--card) / var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--card-foreground)/ var(--tw-text-opacity))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover)/ var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--popover-foreground)/ var(--tw-text-opacity))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary) / var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--primary-foreground) /  var(--tw-text-opacity))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--secondary-foreground) / var(--tw-text-opacity))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted)/ var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--muted-foreground)/ var(--tw-text-opacity))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / var(--tw-bg-opacity))",
                    foreground:
                        "hsl(var(--accent-foreground) / var(--tw-text-opacity))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive)/ var(--tw-bg-opacity) )",
                    foreground:
                        "hsl(var(--destructive-foreground)/ var(--tw-text-opacity))",
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
