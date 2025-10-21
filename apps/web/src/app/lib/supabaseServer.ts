// apps/web/src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 服务端/边缘运行时用 Supabase 客户端（新签名：必须传 cookies 适配器）
 * - 用于 app router 的 Server Component / route handlers / actions
 */
export function createServerSupabase(): SupabaseClient<any, "public", any> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 或者仅用 ANON（看你的后端权限需求）

    const cookieStore = cookies();

    return createServerClient(url, key, {
        cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
            cookieStore.set(name, value, options);
        },
        remove: (name: string, options: any) => {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
        }
        }
    });
}
