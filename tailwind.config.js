/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'image-meteo': "url('/images/meteo.png')",
        'image-climate': "url('/images/climate.png')",
        'image-geo': "url('/images/geo.png')",
        'image-news': "url('/images/news.png')",
        'image-background': "url('/images/background.png')",
      },
      colors: {
        background: '#00104A',
      },
    },
  },
  plugins: [],
}
