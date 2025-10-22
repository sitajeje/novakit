// packages/core/src/lib/createBrowserSupabase.ts
'use client';
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 浏览器专用 Supabase 客户端工厂
 * - 仅在 CSR/Client Component 使用
 * - 避免服务端加载 node-fetch 依赖，从而触发 "stream" 错误
 */
let browserClient: SupabaseClient<any, "public", any> | null = null;

export const createBrowserSupabase = (): SupabaseClient<any, "public", any> => {
    if (typeof window === "undefined") {
        console.warn("[createBrowserSupabase] called on server. returning dummy client.");
        return {} as SupabaseClient<any, "public", any>;
    }

    if (browserClient) {
        return browserClient;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing Supabase env vars for browser.");

    browserClient = createBrowserClient(url, key, { 
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
        }, });
    return browserClient;
};
