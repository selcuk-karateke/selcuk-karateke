import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'brand': {
                    'primary': '#A63D33',
                    'secondary': '#D9985F',
                }
            },
        },
    },
    plugins: [],
}

export default config
