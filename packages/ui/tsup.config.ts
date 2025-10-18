import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: {
        resolve: true, //关键配置：让 tsup 解析跨文件依赖
    },
    sourcemap: true,
    clean: true,
    splitting: false,
    target: 'esnext',
    outDir: 'dist',
    minify: false,
    tsconfig: './tsconfig.json',
    external: ['react', 'react-dom']
});
