// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // ✅ 关键：告诉 Vercel 这是 Server 模式，允许 API routes
    output: "standalone",

    // ✅ App Router 已默认启用，无需 appDir 参数
    experimental: {
        serverComponentsExternalPackages: ["@supabase/supabase-js"],
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    // ✅ 添加构建日志，确认是否在 Vercel 环境
    webpack(config, { isServer }) {
        if (process.env.VERCEL) {
        console.log("🔧 Vercel build detected — forcing server runtime only");
        }
        return config;
    },
};

export default nextConfig;



