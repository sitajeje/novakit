// apps/web/src/pages/login.tsx
'use client';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // 如果已登录，跳转到 /dashboard
        supabase.auth.getSession().then(({ data }) => {
        if (data.session) router.replace("/dashboard");
        });
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
        });
        setLoading(false);
        if (error) {
        alert(error.message);
        return;
        }
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">Login</h2>
            <label className="block mb-2">Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" required/>
            </label>
            <label className="block mb-4">Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border px-2 py-1 rounded" required/>
            </label>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Logging in..." : "Login"}
            </button>
            {/* 新增注册链接 */}
            <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
                Create one
            </a>
            </p>
        </form>
        </div>
    );
}
