// ✅ apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone", // ✅ 保证 API routes 打包为独立 Serverless Functions
    experimental: {
        appDir: true, // ✅ 强制启用 App Router
        serverComponentsExternalPackages: ["@supabase/supabase-js"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;

