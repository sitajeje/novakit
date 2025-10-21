// ✅ apps/web/src/app/api/_utils/apiHandler.ts
import { NextResponse } from "next/server";

/**
 * Wraps async API handlers with error and logging middleware.
 * Keeps your route.ts files clean and consistent.
 */
export function withApiHandler<TParams = any>(
    handler: (req: Request, context?: { params?: TParams }) => Promise<NextResponse>
) {
    return async (req: Request, context?: { params?: TParams }): Promise<NextResponse> => {
        const start = Date.now();
        try {
        const res = await handler(req, context);
        console.info(`[API] ${req.method} ${req.url} ✅ ${Date.now() - start}ms`);
        return res;
        } catch (error: any) {
        console.error(`[API] ${req.method} ${req.url} ❌`, error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
        }
    };
}
