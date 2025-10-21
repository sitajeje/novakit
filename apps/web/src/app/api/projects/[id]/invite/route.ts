// ✅ apps/web/src/app/api/projects/[id]/invite/route.ts
import { NextResponse } from "next/server";
import { withApiHandler } from "../../../_utils/apiHandler";
import { supabaseAdmin } from "../../../_utils/supabaseAdmin";

/**
 * Invite a member to a project by email.
 * - Only project owner can invite
 * - Automatically adds record to project_members
 */
export const POST = withApiHandler(async (req: Request, context) => {
    try {
        const projectId = context?.params?.id;
        const { email, role = "member" } = await req.json();

        if (!projectId || !email) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        // 🔍 Find user by email
        const { data: userData, error: userErr } = await supabaseAdmin
        .from("auth.users")
        .select("id, email")
        .eq("email", email)
        .maybeSingle();

        if (userErr || !userData) {
        return NextResponse.json(
            { error: "User not found in system. Ask them to register first." },
            { status: 404 }
        );
        }

        const userId = userData.id;

        // 🧠 Check if already a member
        const { data: existing } = await supabaseAdmin
        .from("project_members")
        .select("user_id")
        .eq("project_id", projectId)
        .eq("user_id", userId)
        .maybeSingle();

        if (existing) {
        return NextResponse.json({ error: "User is already a project member." }, { status: 400 });
        }

        // ✅ Insert new member
        const { error: insertErr } = await supabaseAdmin
        .from("project_members")
        .insert([{ project_id: projectId, user_id: userId, role }]);

        if (insertErr) throw insertErr;

        return NextResponse.json({ success: true, user: { id: userId, email }, role });
    } catch (err: any) {
        console.error("Invite member failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
});
