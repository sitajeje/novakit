// apps/web/src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button, TenantSelect, ProjectSelect,Card, CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from "@novakit/ui";
import { ProjectTable } from "../../components/ProjectTable";

type Tenant = { id: string; name: string };
type Project = { id: string; name: string; description?: string; tenant_id: string };

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
            router.replace("../login/login");
            return;
        }
        const user = data.session.user;
        setUser(user);
        await fetchTenants(user.id);
        setLoading(false);
        };
        init();

        // 监听 auth 状态变化（登出）
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (!session) router.replace("../login/login");
        });
        return () => listener?.subscription?.unsubscribe?.();
    }, []);

    // 当 tenant 切换时自动加载对应项目
    useEffect(() => {
        if (selectedTenant) {
        fetchProjects(selectedTenant);
        }
    }, [selectedTenant]);

    const fetchTenants = async (userId: string) => {
        // 通过 tenant_memberships 查找用户的租户
        const { data: tm, error } = await supabase
        .from("tenant_memberships")
        .select("tenant_id, tenants!tenant_memberships_tenant_id_fkey ( id, name )")
        .eq("user_id", userId);
        if (error) {
            console.error(error);
            return;
        }
        const tlist = (tm || []).map((r: any) => r.tenants).filter(Boolean);
        setTenants(tlist);
        // 自动选择第一个 tenant（仅首次）
        if (!selectedTenant && tlist.length > 0) {
        setSelectedTenant(tlist[0].id);
        }
    };

    const fetchProjects = async (tenantId: string | null) => {
        if (!tenantId) return;
        const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false });
        if (error) {
            console.error(error);
            return;
        }
        setProjects(data || []);
        if (data && data.length > 0) {
            setSelectedProject(data[0].id);
        } else {
            setSelectedProject(null);
        }
    };

    const handleCreateTenant = async () => {
        const name = prompt("Tenant name?");
        if (!name) return;
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) {
            alert("Not logged in");
            return;
        }

        const res = await fetch("/api/create-tenant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, user_id: user.id }),
        });

        const data = await res.json();
        if (!res.ok) {
            alert("Create tenant failed: " + data.error);
            return;
        }

        alert(`Tenant "${name}" created successfully`);
        fetchTenants(user.id);
    };
    const handleCreateProject = async () => {
        if (!selectedTenant) return alert("Please select a tenant first");

        const name = prompt("Project name?");
        if (!name) return;

        const description = prompt("Project description?") || "";

        const res = await fetch("/api/create-project", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, tenant_id: selectedTenant,user_id: user.id }),
        });

        const data = await res.json();
        if (!res.ok) return alert("Create project failed: " + data.error);

        alert(`Project "${name}" created successfully`);
        fetchProjects(selectedTenant);
    };
    // [新增] Update a project (name/description)
    const handleUpdateProject = async (projectId: string) => {
        const name = prompt("New project name?");
        if (!name) return;
        const description = prompt("New description?") || "";

        const { error } = await supabase
            .from("projects")
            .update({ name, description })
            .eq("id", projectId);

        if (error) return alert("Update failed: " + error.message);
        // refresh local list
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, name, description } : p));
    };
    // [新增] Delete a project
    const handleDeleteProject = async (projectId: string) => {
        if (!confirm("Confirm delete this project?")) return;
        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", projectId);
        if (error) return alert("Delete failed: " + error.message);

        setProjects(prev => prev.filter(p => p.id !== projectId));
        if (selectedProject === projectId) setSelectedProject(null);
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl">NovaKit Dashboard</h1>
            <div>
                <Button className="bg-red-500 mr-2" onClick={async () => { await supabase.auth.signOut(); router.replace("/login"); }}>
                    Logout
                </Button>
                <Button className="bg-green-600 mr-2" onClick={handleCreateTenant}>
                    Create Tenant
                </Button>
                <Button className="bg-blue-600" onClick={handleCreateProject}>
                    Create Project
                </Button>
            </div>
        </div>

        <div className="mb-4">
            <TenantSelect
                tenants={tenants}
                selectedTenant={selectedTenant ?? ""}
                onValueChange={(tenantId) => {
                    if (tenantId !== selectedTenant) {
                    setSelectedTenant(tenantId);
                    setProjects([]); 
                    }
                }}
            />
            <ProjectSelect
                projects={projects}
                selectedProject={selectedProject}
                onChange={(projectId) => {
                    setSelectedProject(projectId);
                    // move selected to top
                    setProjects((prev) => {
                    const idx = prev.findIndex(p => p.id === projectId);
                    if (idx < 0) return prev;
                    const sel = prev[idx];
                    if (!sel) return prev;
                    const rest = prev.filter((_, i) => i !== idx);
                    return [sel, ...rest];
                    });
                }}
            />    
        </div>

        <div>
            <h2 className="text-xl mb-2">Projects</h2>
            <div className="space-y-2">
            {projects.length === 0 && <div className="text-gray-500">No projects yet.</div>}
            {projects.map(p => (
                <Card key={p.id} className="p-3 border rounded hover:translate-y-[-3px] transition-transform cursor-pointer">
                <CardHeader>
                    <CardTitle>{p.name}</CardTitle>
                    {p.description && (
                    <CardDescription>{p.description}</CardDescription>
                    )}
                </CardHeader>

                <CardContent>
                    {selectedProject === p.id && (
                        <div className="mt-4 space-y-3">
                            {p.description && (
                            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">
                                {p.description}
                            </div>
                            )}
                            <ProjectTable projectId={p.id} />
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition"
                    onClick={() => {
                        setSelectedProject(p.id);
                        router.push(`/projects/${p.id}`);
                    }}
                    >
                    Open
                    </Button>
                    <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition" onClick={() => handleUpdateProject(p.id)}>Edit</Button>
                    <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition" onClick={() => handleDeleteProject(p.id)}>Delete</Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        </div>
        </div>
    );
}
