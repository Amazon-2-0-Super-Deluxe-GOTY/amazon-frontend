import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          press: "hsl(var(--primary-press))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          press: "hsl(var(--secondary-press))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          hover: "hsl(var(--tertiary-hover))",
          press: "hsl(var(--tertiary-press))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          shadow: "hsl(var(--destructive-shadow))",
          press: "hsl(var(--destructive-press))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        light: {
          DEFAULT: "hsl(var(--light))",
        },
      },
      boxShadow: {
        button: "0px 1px 7px -5px",
        lg: "0px 4px 11.5px -5px",
      },
      boxShadowColor: {
        "color-card": "hsla(var(--shadow-color-card))",
        "color-card-hover": "hsl(var(--shadow-color-card-hover))",
      },
      borderWidth: {
        "1.5": "1.5px",
        "2.5": "2.5px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      strokeWidth: {
        "3": "3",
      },
      padding: {
        "4.5": "1.125rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      containers: {
        "md-card": "13rem",
        "lg-card": "23rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    {
      handler: ({ addComponents }) => {
        addComponents({
          ".text-heading-1": {
            fontSize: "2.25rem",
            lineHeight: "2.75rem",
            letterSpacing: "-0.02rem",
            fontWeight: "600",
            "@media (min-width: 1280px)": {
              fontSize: "2.5rem",
              lineHeight: "3rem",
            },
          },
          ".text-heading-2": {
            fontSize: "1.75rem",
            lineHeight: "2rem",
            letterSpacing: "-0.015rem",
            fontWeight: "600",
            "@media (min-width: 1280px)": {
              fontSize: "2rem",
              lineHeight: "2.25rem",
            },
          },
          ".text-heading-3": {
            fontSize: "1.25rem",
            lineHeight: "1.5rem",
            letterSpacing: "-0.015rem",
            fontWeight: "500",
            "@media (min-width: 1280px)": {
              fontSize: "1.5rem",
              lineHeight: "1.75rem",
            },
          },
        });
      },
    },
  ],
} satisfies Config;

export default config;
