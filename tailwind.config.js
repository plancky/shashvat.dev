/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./layouts/**/*.{html,css,js,md}","./content/**/*.md", "./hugo_stats.json"],
    theme: {
        extend: {
            fontFamily: {
                'body': ['Sarabun'],
                'button': ['Orbitron','sans-serif']
            },
            colors: {
                primary: {
                    400: 'var(--clr-primary-400)',
                    500: 'var(--clr-primary-500)',
                },
                secondary: 'var(--clr-secondary-400)',
                neutral: colors.green,
                accent: {
                    1: 'var(--clr-accent-1)'
                }
            }
        },
    },
    plugins: [],
}
