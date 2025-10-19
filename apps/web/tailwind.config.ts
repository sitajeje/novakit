// apps/web/tailwind.config.ts
import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require("../../tailwind.config");

const config: Config = {
    ...baseConfig,
    content: [
        "./src/**/*.{ts,tsx}",
        "../../packages/ui/src/**/*.{ts,tsx}",
    ],
};

export default config;
