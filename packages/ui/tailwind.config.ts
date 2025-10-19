import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
        colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            },
            muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
        },
        borderRadius: {
            xl: "var(--radius-xl)",
            "2xl": "var(--radius-2xl)",
        },
        },
    },
    plugins: [],
};

export default config;

