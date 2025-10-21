// apps/web/src/app/api/create-project/route.ts
import { NextResponse } from "next/server";
import { withApiHandler } from "../_utils/apiHandler";
import { supabaseAdmin } from "../_utils/supabaseAdmin";

export const POST = withApiHandler(async (req: Request) => {
    try {
        const { name, description, tenant_id ,user_id} = await req.json();
        if (!name || !tenant_id || !user_id) NextResponse.json({ error: "Missing parameters" }, { status: 400 });

        // 检查是否重名（同一个租户下不能重名）
        const { data: existing } = await supabaseAdmin
            .from("projects")
            .select("id")
            .eq("tenant_id", tenant_id)
            .eq("name", name);

        if (existing && existing.length > 0) {
            return NextResponse.json(
                { error: "Project with the same name already exists in this tenant." },
                { status: 400 }
            );
        }
        
        const { data: project, error } = await supabaseAdmin
        .from("projects")
        .insert([{ name, description, tenant_id,created_by: user_id }])
        .select()
        .single();

        if (error) throw error;

        // 把创建者加入 project_members
        const { error: memberErr } = await supabaseAdmin
            .from("project_members")
            .insert([{ project_id: project.id, user_id, role: "owner" }]);

        if (memberErr) {
            console.error("⚠️ project_members insert failed:", memberErr.message);
        }
        return NextResponse.json({ success: true, project}, { status: 200 });
    } catch (err: any) {
        console.error("Create tenant failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
});
