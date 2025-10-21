import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        "src/index.ts",
        "src/lib/createBrowserSupabase.ts",
    ],
    format: ['esm'],
    external: [
        "@supabase/ssr",
        "@supabase/supabase-js",
        "@supabase/supabase-js/*",
        "@supabase/node-fetch",
        "@supabase/postgrest-js"
    ],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    target: 'esnext',
    outDir: 'dist',
    minify: false,
    tsconfig: './tsconfig.json',
});
