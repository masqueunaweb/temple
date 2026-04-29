import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FAFAFA',
          text: '#0A0A0A',
          textSecondary: '#6B6B6B',
          border: '#E5E5E5',
        },
        dark: {
          bg: '#0A0A0A',
          text: '#F5F5F5',
          textSecondary: '#6B6B6B',
          border: '#1F1F1F',
        },
        accent: '#0A0A0A',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
};
export default config;
