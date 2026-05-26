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
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "rgba(var(--color-accent-rgb), 0.08)",
        },
        base: "var(--color-base)",
        surface: {
          DEFAULT: "var(--color-surface)",
          deep: "var(--color-surface-2)",
        },
        line: {
          subtle: "var(--color-border-subtle)",
          DEFAULT: "var(--color-border-default)",
          emphasis: "var(--color-border-emphasis)",
        },
        ink: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          tertiary: "var(--color-text-tertiary)",
          deep: "var(--color-text-deep)",
        },
        positive: "var(--color-signal-positive)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
