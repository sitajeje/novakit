// packages/core/src/store/useProjectsStore.ts
import { create } from "zustand";
import { createBrowserSupabase } from "../lib/createBrowserSupabase"; 

export type Task = {
    id: string;
    name: string;
    note?: string;
    status?: string;
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
            if (!error) set({ tasks: data || [] });
    },

    addTask: async (projectId, name, note = "") => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
        .from("tasks")
        .insert([{ project_id: projectId, name, note }])
        .select()
        .single();
        if (!error && data) set({ tasks: [data, ...get().tasks] });
    },

    toggleTask: async (taskId, newStatus) => {
        const supabase = createBrowserSupabase(); 
        const { data, error } = await supabase
        .from("tasks")
        .update({ is_done: newStatus })
        .eq("id", taskId)
        .select()
        .single();
        if (!error && data)
        set({ tasks: get().tasks.map((t) => (t.id === taskId ? data : t)) });
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
        if (!error && data)
        set({ tasks: get().tasks.map((t) => (t.id === taskId ? data : t)) });
    },
}));