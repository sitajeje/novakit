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
    project_id?: string;
};

type TaskStore = {
    tasks: Task[];
    fetchTasks: (projectId: string) => Promise<void>;
    addTask: (projectId: string, name: string, note?: string) => Promise<void>;
    toggleTask: (taskId: string, newStatus: boolean) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    updateTask: (taskId: string, name?: string, note?: string) => Promise<void>;
};

export const useProjectsStore = create<TaskStore>((set, get) => ({
    tasks: [],

    fetchTasks: async (projectId) => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: false });
        if (!error) {
            const mapped = (data || []).map((t: any) => ({
                ...t,
                is_done: !!t.status, // map DB boolean status -> UI is_done
            }));
            set({ tasks: mapped });
        }
    },

    addTask: async (projectId, name, note = "") => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
            .from("tasks")
            .insert([{ project_id: projectId, name, note, status: false }])
            .select()
            .single();
        if (!error && data) {
            const mapped = { ...data, is_done: !!data.status };
            set({ tasks: [mapped, ...get().tasks] });
        }
    },

    toggleTask: async (taskId, newStatus) => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
            .from("tasks")
            .update({ status: newStatus })
            .eq("id", taskId)
            .select()
            .single();
        if (!error && data) {
            const mapped = { ...data, is_done: !!data.status };
            set({ tasks: get().tasks.map((t) => (t.id === taskId ? mapped : t)) });
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
        const { data, error } = await supabase
            .from("tasks")
            .update({ name, note })
            .eq("id", taskId)
            .select()
            .single();
        if (!error && data) {
            const mapped = { ...data, is_done: !!data.status };
            set({ tasks: get().tasks.map((t) => (t.id === taskId ? mapped : t)) });
        }
    },
}));