import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const { name, description, tenant_id } = req.body;
        if (!name || !tenant_id) return res.status(400).json({ error: "Missing parameters" });

        // 检查是否重名（同一个租户下不能重名）
        const { data: existing } = await supabaseAdmin
            .from("projects")
            .select("id")
            .eq("tenant_id", tenant_id)
            .eq("name", name);

        if (existing && existing.length > 0) {
            return res.status(400).json({ error: "Project with the same name already exists in this tenant." });
        }
        
        const { data, error } = await supabaseAdmin
        .from("projects")
        .insert([{ name, description, tenant_id }])
        .select()
        .single();

        if (error) throw error;

        res.status(200).json({ success: true, project: data });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
