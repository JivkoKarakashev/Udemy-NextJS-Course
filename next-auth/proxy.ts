import { NextRequest, NextResponse } from "next/server";

import { cleanupExpiredSessions, validateSession } from "@/lib/sessions.ts";
import { deleteCookieByMethod } from "./utils/cookie-setter.ts";

export async function proxy(req: NextRequest): Promise<NextResponse> {
    const sessionId = req.cookies.get("session")?.value;
    // console.log(sessionId);
    const redirect = () => NextResponse.redirect(new URL("/", req.url));
    const redirectWithCleanup = async (): Promise<NextResponse> => {
        const res = redirect();
        const response = await deleteCookieByMethod('proxy', res);
        if (response instanceof NextResponse === false) {
            throw new Error('Wrong response Class instance!');
        }
        return response;
    };

    cleanupExpiredSessions();
    if (sessionId === undefined) {
        return await redirectWithCleanup();
    }
    const session = validateSession(sessionId);
    if (session === undefined) {
        return await redirectWithCleanup();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/training', '/training/:path*'],
};