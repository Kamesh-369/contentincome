import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand color (YouTube Red)
                // Usage: Primary actions, call-to-action buttons, active states
                primary: "#e31010",

                // Main app background (Light Gray)
                // Usage: Page background, large surface areas
                background: "#eeeeee",

                // Main text color (Black)
                // Usage: Headings, body text, high-emphasis content
                foreground: "#000000",

                // Secondary / Muted text (Dark Gray)
                // Usage: Subtitles, metadata, secondary information, placeholders
                muted: "#8d8686",

                // Border color (Gray)
                // Usage: Dividers, input borders, card outlines
                border: "#b2b2b2",
            },
        },
    },
    plugins: [],
};
export default config;
