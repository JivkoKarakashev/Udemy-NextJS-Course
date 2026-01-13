import { NextRequest, NextResponse } from "next/server";

import { cleanupExpiredSessions, validateSession } from "@/lib/sessions.ts";
import { deleteCookieByMethod } from "./utils/cookie-setter.ts";

export async function proxy(req: NextRequest): Promise<NextResponse> {
    const sessionId = req.cookies.get("session")?.value;
    // console.log(sessionId);
    const redirect = () => NextResponse.redirect(new URL("/", req.url));
    const redirectWithCleanup = async (): Promise<NextResponse> => {
        const redir = redirect();
        // res = deleteCookie(res);
        // res.cookies.set('session', '', {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     path: '/',
        //     maxAge: 0,
        //     expires: new Date(0)
        // });
        // return res;
        const response = await deleteCookieByMethod('proxy', redir);
        if (response instanceof NextResponse) {
            return response;
        } else {
            throw new Error('Wrong response Class instance!');
        }
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