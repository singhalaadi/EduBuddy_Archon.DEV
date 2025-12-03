/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'candy-pink': '#FF9AA2',
                'candy-peach': '#FFB7B2',
                'candy-melon': '#FFDAC1',
                'candy-mint': '#E2F0CB',
                'candy-ice': '#B5EAD7',
                'candy-plum': '#C7CEEA',
                'kid-blue': '#4FACFE',
                'kid-orange': '#FF9966',
                'kid-yellow': '#FFDE59',
                'kid-green': '#7ED957',
                'kid-purple': '#CB6CE6',
            },
            fontFamily: {
                'bubble': ['"Fredoka"', 'sans-serif'],
                'reading': ['"Comic Neue"', 'cursive', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
