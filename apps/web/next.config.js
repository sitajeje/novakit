/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true, // ✅ 开启 app router 模式
    },
};

export default nextConfig;
