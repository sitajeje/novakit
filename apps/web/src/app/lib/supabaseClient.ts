// apps/web/lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * ✅ 浏览器专用 Supabase 客户端
 * - 自动保存 token 到 localStorage
 * - 仅在 CSR 运行
 */
export const supabase: SupabaseClient = (() => {
    if (typeof window === "undefined") {
        // ⚠️ 防止在服务器执行时报错
        throw new Error("supabaseClient should only be used in the browser");
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createBrowserClient(url, anon, {
        auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage, // ✅ 明确指定 localStorage
        },
    });
})();

