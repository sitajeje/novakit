// packages/core/src/store/useProjectsStore.ts
import { create } from "zustand";
import { createBrowserSupabase } from "../lib/createBrowserSupabase"; 

export type Task = {
    id: string;
    name: string;
    note?: string;
    status?: boolean; 
    is_done?: boolean;
    created_at?: string;
    created_by?: string;
    project_id?: string;
    order_index?: number;
};

type TaskStore = {
    tasks: Task[];
    fetchTasks: (projectId: string) => Promise<void>;
    addTask: (projectId: string, name: string, note?: string) => Promise<void>;
    toggleTask: (taskId: string, newStatus: boolean) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    updateTask: (taskId: string, name?: string, note?: string) => Promise<void>;
    reorderTasks: (orderedIds: string[]) => Promise<void>;
    fetchMembers: (projectId: string) => Promise<Array<{ id: string; name: string; role: string }>>;
};

export const useProjectsStore = create<TaskStore>((set, get) => ({
    tasks: [],

    fetchTasks: async (projectId) => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
            .from("tasks")
            .select(`
                id,
                name,
                note,
                status,
                created_at,
                project_id,
                created_by,
                creator:profiles!tasks_created_by_fkey(id, full_name)
            `)
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });
        if (!error) {
            const mapped = (data || []).map((t: any) => ({
                ...t,
                is_done: !!t.status, // map DB boolean status -> UI is_done
                creator_name: t.creator?.full_name || "Unknown"
            }));
            set({ tasks: mapped });
        }
    },

    addTask: async (projectId, name, note = "") => {
        const supabase = createBrowserSupabase(); 
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("tasks")
            .insert([{ project_id: projectId, name, note, status: false, created_by: user?.id || null }])
            .select()
            .single();
        if (!error && data) {
            // 重新取该 task 的完整信息（包含 join 到 profiles）
            const { data: full, error: refetchError } = await supabase
                .from("tasks")
                .select(`
                    *,
                    creator:profiles!tasks_created_by_fkey(id, full_name)
                `)
                .eq("id", data.id)
                .single();

            const mapped = {
            ...(full || data),
            is_done: !!(full?.status ?? data.status),
            creator_name: full?.creator?.full_name || "Unknown",
            };

            set({ tasks: [mapped, ...get().tasks] });
        }
    },

    toggleTask: async (taskId, currentStatus) => {
        const supabase = createBrowserSupabase(); 
        const newStatus = !currentStatus;
        const { data, error } = await supabase
            .from("tasks")
            .update({ status: newStatus })
            .eq("id", taskId)
            .select()
            .single();

        if (error) {
            console.error("toggleTask error:", error.message);
            return;
        }
        if (data) {
            const mapped = { ...data, is_done: !!data.status };
            set({
            tasks: get().tasks.map((t) => (t.id === taskId ? mapped : t)),
            });
        }
    },

    deleteTask: async (taskId) => {
        const supabase = createBrowserSupabase(); 
        const { error } = await supabase.from("tasks").delete().eq("id", taskId);
        if (!error)
        set({ tasks: get().tasks.filter((t) => t.id !== taskId) });
    },

    updateTask: async (taskId, name, note) => {
        const supabase = createBrowserSupabase(); 
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (note !== undefined) updateData.note = note;

        const { data, error } = await supabase
            .from("tasks")
            .update(updateData)
            .eq("id", taskId)
            .select()
            .single();
        if (!error && data) {
            set({
                tasks: get().tasks.map((t) => (t.id === taskId ? { ...data, is_done: !!data.status } : t)),
            });
        }
    },

    reorderTasks: async (orderedIds) => {
        const supabase = createBrowserSupabase();
        const payload = orderedIds.map((id, i) => ({ id, order_index: i }));
        const { error } = await supabase.from("tasks").upsert(payload);
        if (error) {
            console.error("[reorderTasks] ❌", error);
            return;
        }
        // 本地也同步顺序
        const current = [...get().tasks];
        current.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
        set({ tasks: current });
    },

    fetchMembers: async (projectId) => {
        const supabase = createBrowserSupabase();
        const { data, error } = await supabase
            .from("project_members")
            .select(`
                project_id,
                user_id,
                role,
                profile:profiles!project_members_user_id_fkey(id, full_name)
            `)
            .eq("project_id", projectId);

        if (error) {
            console.error("Error fetching members:", error.message);
            return [];
        }

        return (data || []).map((m: any) => ({
            id: m.user_id,
            name: m.profile?.full_name || "Unknown User",
            role: m.role || "member",
        }));
    },

}));