// apps/web/src/pages/register.tsx
'use client';
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
        email,
        password
        });
        setLoading(false);
        if (error) {
        alert(error.message);
        return;
        }
        // Supabase by default sends confirmation email if enabled.
        alert("Registration success. Check your email for confirmation if required.");
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">Register</h2>
            <label className="block mb-2">Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" required/>
            </label>
            <label className="block mb-4">Password
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border px-2 py-1 rounded" required/>
            </label>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Registering..." : "Register"}
            </button>
        </form>
        </div>
    );
}
