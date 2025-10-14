/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,           // ✅ 启用 test/expect 全局
        environment: 'jsdom',    // ✅ 模拟浏览器环境
        setupFiles: ['./vitest.setup.ts'], // 可选
        include: ['tests/**/*.test.{ts,tsx}'],
        css: true
    }
});
