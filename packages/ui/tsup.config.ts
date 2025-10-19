import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false,
    sourcemap: true,
    clean: true,
    splitting: false,
    target: 'esnext',
    outDir: 'dist',
    minify: false,
    tsconfig: './tsconfig.json',
    external: [
        'react',
        'react-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'tailwind-merge',
        'clsx',
    ],
});
