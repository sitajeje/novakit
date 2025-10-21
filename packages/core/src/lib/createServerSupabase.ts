import { createServerClient, type CookieMethodsServer, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

type ServerCookieStore = {
    getAll: () => ReturnType<CookieMethodsServer["getAll"]>;
    setAll?: (cookies: Parameters<NonNullable<CookieMethodsServer["setAll"]>>[0]) => ReturnType<NonNullable<CookieMethodsServer["setAll"]>>;
    set?: (name: string, value: string, options: CookieOptions) => void | Promise<void>;
};

export const createServerSupabase = (cookieStore: ServerCookieStore): SupabaseClient<any, "public", any> => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!url || !key) throw new Error("Missing Supabase env vars for server.");

    if (typeof cookieStore?.getAll !== "function") {
        throw new Error("createServerSupabase requires a cookie store with a getAll() method.");
    }

    const getAll: CookieMethodsServer["getAll"] = async () => {
        const all = await cookieStore.getAll();
        if (!all) return null;
        const list = Array.isArray(all) ? all : Array.from(all as Iterable<{ name: string; value: string }>);
        return list.map(({ name, value }) => ({ name, value }));
    };

    const setAll: CookieMethodsServer["setAll"] =
        typeof cookieStore.setAll === "function"
            ? async (cookies) => {
                  await cookieStore.setAll!(cookies);
              }
            : typeof cookieStore.set === "function"
              ? async (cookies) => {
                    for (const { name, value, options } of cookies) {
                        await cookieStore.set!(name, value, options);
                    }
                }
              : undefined;

    return createServerClient(url, key, {
        cookies: {
            getAll,
            setAll,
        },
    });
};
