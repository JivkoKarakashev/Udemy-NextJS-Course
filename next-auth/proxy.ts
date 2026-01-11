import { cleanupExpiredSessions, validateSession } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest): NextResponse {
    const sessionId = req.cookies.get("session")?.value;
    console.log(sessionId);
    const redirect = () => NextResponse.redirect(new URL("/", req.url));
    const redirectWithCleanup = (): NextResponse => {
        const res = redirect();
        res.cookies.set('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0,
            expires: new Date(0)
        });
        return res;
    };

    cleanupExpiredSessions();
    if (sessionId === undefined) {
        return redirectWithCleanup();
    }
    const session = validateSession(sessionId);
    if (session === undefined) {
        return redirectWithCleanup();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/training', '/training/:path*'],
};