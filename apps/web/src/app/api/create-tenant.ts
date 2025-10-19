// apps/web/src/pages/api/create-tenant.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ 非公开 key
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, user_id } = req.body;

        if (!name || !user_id) {
        return res.status(400).json({ error: "Missing name or user_id" });
        }

        // 检查是否重名（同一个用户下不能重名）
        const { data: existing } = await supabaseAdmin
            .from("tenant_memberships")
            .select("tenant_id, tenants!inner(name)")
            .eq("user_id", user_id)
            .eq("tenants.name", name);
        if (existing && existing.length > 0) {
            return res.status(400).json({ error: "Tenant with the same name already exists." });
        }

        // 创建 tenant
        const { data: tenant, error: tenantError } = await supabaseAdmin
        .from("tenants")
        .insert([{ name }])
        .select()
        .single();

        if (tenantError) throw tenantError;

        // 将用户加入 tenant_memberships
        const { error: memberError } = await supabaseAdmin
        .from("tenant_memberships")
        .insert([{ tenant_id: tenant.id, user_id }]);

        if (memberError) throw memberError;

        // 更新 profiles 表（设置 tenant_id 和角色）
        const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({ tenant_id: tenant.id, role: "owner" })
        .eq("id", user_id);

        if (profileError) throw profileError;

        return res.status(200).json({ success: true, tenant });
    } catch (err: any) {
        console.error("Create tenant failed:", err);
        return res.status(500).json({ error: err.message });
    }
}
