// ✅ apps/web/src/app/api/_utils/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client
 * Use only on API routes (never expose SERVICE_ROLE_KEY to client)
 */
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
