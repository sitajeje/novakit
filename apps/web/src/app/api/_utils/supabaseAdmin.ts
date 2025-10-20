import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
    throw new Error("❌ Supabase admin client missing environment variables.");
}

/**
 * Supabase 管理端客户端
 * ⚠️ 使用 Service Role Key，仅在服务器端使用！
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceKey);
