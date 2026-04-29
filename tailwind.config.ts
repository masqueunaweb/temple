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
        temple: {
          accent: 'var(--temple-accent)',
          accentText: 'var(--temple-accent-text)',
          bg: 'var(--temple-bg)',
          bgElevated: 'var(--temple-bg-elevated)',
          surface: 'var(--temple-surface)',
          surfaceHover: 'var(--temple-surface-hover)',
          border: 'var(--temple-border)',
          borderSubtle: 'var(--temple-border-subtle)',
          textPrimary: 'var(--temple-text-primary)',
          textSecondary: 'var(--temple-text-secondary)',
          textTertiary: 'var(--temple-text-tertiary)',
          success: 'var(--temple-success)',
          error: 'var(--temple-error)',
          warning: 'var(--temple-warning)',
        },
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--temple-radius-sm)',
        md: 'var(--temple-radius-md)',
        lg: 'var(--temple-radius-lg)',
      },
      transitionDuration: {
        DEFAULT: 'var(--temple-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--temple-ease)',
      },
    },
  },
  plugins: [],
};
export default config;
