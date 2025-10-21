// packages/core/src/lib/createBrowserSupabase.ts
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 浏览器专用 Supabase 客户端工厂
 * - 仅在 CSR/Client Component 使用
 * - 避免服务端加载 node-fetch 依赖，从而触发 "stream" 错误
 */
export function createBrowserSupabase(): SupabaseClient<any, "public", any> {
    if (typeof window === "undefined") {
        throw new Error("createBrowserSupabase() must be called in the browser.");
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createBrowserClient(url, anon);
}
