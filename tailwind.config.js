/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Official Universidad de Cartagena Palette (from brand book CMYK specs)
        udc: {
          navy: "#171a3d",        // C:100 M:93 Y:39 K:54 (Azul Institucional Primario)
          purple: "#44216b",      // C:85 M:100 Y:17 K:5 (Morado UDC)
          teal: "#3da898",        // C:76 M:9 Y:46 K:0 (Verde / Turquesa UDC)
          yellow: "#f2b725",      // C:5 M:27 Y:90 K:0 (Amarillo Mostaza UDC)
          orange: "#ec8026",      // C:1 M:48 Y:89 K:0 (Naranja UDC)
          red: "#df4838",         // C:0 M:81 Y:74 K:0 (Rojo Coral UDC)
          // Soft tint variations for backgrounds and pills
          "navy-subtle": "#edf0f7",
          "purple-subtle": "#f4edf9",
          "teal-subtle": "#edf7f5",
          "yellow-subtle": "#fdf8ea",
          "orange-subtle": "#fdf3eb",
          "red-subtle": "#fcf0ee",
        },
        // Slush Design Tokens mapped to official identity
        carbon: "#171a3d",
        "paper-white": "#ffffff",
        "sky-wash": "#edf0f7",
        "concrete-gray": "#e2e6ef",
        "soft-mist": "#f4f6fa",
        "electric-blue": "#3da898",
        "mint-pop": "#3da898",
        lavender: "#f4edf9",
        ember: "#df4838",
        sunburst: "#f2b725",
        "voltage-violet": "#44216b",

        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#fb4903",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e9e9e9",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#4da2ff",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
      },
      fontFamily: {
        lateral: ["Antonio", "Bowlby One", "Impact", "sans-serif"],
        aeonik: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        nav: "1600px",
        pills: "1600px",
        buttons: "1600px",
        cards: "20px",
        "cards-elevated": "40px",
        body: "30px",
        "wallet-icon": "16px",
        full: "1600px",
      },
      lineHeight: {
        display: "0.80",
        "display-lg": "0.75",
        crushed: "0.76",
      },
      letterSpacing: {
        nav: "0.032em",
        body: "-0.010em",
        heading: "-0.010em",
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
    },
  },
  plugins: [],
};
