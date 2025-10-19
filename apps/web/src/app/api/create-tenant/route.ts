// apps/web/src/pages/api/create-tenant/route.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { withApiHandler } from "../_utils/apiHandler";
import { supabaseAdmin } from "../_utils/supabaseAdmin";


export const POST = withApiHandler(async (req: Request) => {
    try {
        const { name, user_id } = await req.json();

        if (!name || !user_id) {
            return NextResponse.json({ error: "Missing name or user_id" }, { status: 400 });
        }

        // 检查是否重名（同一个用户下不能重名）
        const { data: existing } = await supabaseAdmin
            .from("tenant_memberships")
            .select("tenant_id, tenants!inner(name)")
            .eq("user_id", user_id)
            .eq("tenants.name", name);
        if (existing && existing.length > 0) {
            return NextResponse.json({ error: "Tenant with the same name already exists." }, { status: 400 });
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

        return NextResponse.json({ success: true, tenant }, { status: 200 });
    } catch (err: any) {
        console.error("Create tenant failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
});
// 可选：添加 GET 方法，方便浏览器直接访问时提示信息
export async function GET() {
    return NextResponse.json(
        { message: "POST /api/create-tenant to create a new tenant" },
        { status: 200 }
    );
}