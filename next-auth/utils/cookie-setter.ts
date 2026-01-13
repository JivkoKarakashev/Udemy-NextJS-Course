import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_TTL } from "@/types/session.ts";

const createCookie = async (sessionId: string, expiresAt: number): Promise<ReadonlyRequestCookies> => {
    const cookieStore = await cookies();
    const maxAge = SESSION_TTL / 1000;
    const expires = new Date(expiresAt);
    cookieStore.set('session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge,
        expires
    });
    return cookieStore;
};

const deleteCookieByMethod = async (method: 'proxy' | 'action', response?: NextResponse<unknown>): Promise<NextResponse<unknown> | string | undefined> => {
    switch (method) {
        case 'proxy': {
            if (!response) {
                throw new Error('Missing response object Param!');
            }
            response.cookies.set('session', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 0,
                expires: new Date(0)
            });
            return response;
        }
        case 'action': {
            const cookieStore = await cookies();
            const sessionId = cookieStore.get('session')?.value;
            cookieStore.set('session', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 0,
                expires: new Date(0)
            });
            return sessionId;
        }
    }
};

export {
    createCookie,
    deleteCookieByMethod
}