import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_TTL } from "@/types/session.ts";

const getResponseCookiePartial = (maxAge: number, expires: Date): Partial<ResponseCookie> => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge,
        expires
    };
};

const createCookie = async (sessionId: string, expiresAt: number): Promise<ReadonlyRequestCookies> => {
    const cookieStore = await cookies();
    const maxAge = SESSION_TTL / 1000;
    const expires = new Date(expiresAt);
    const cookePartial = getResponseCookiePartial(maxAge, expires);
    cookieStore.set('session', sessionId, cookePartial);
    return cookieStore;
};

const deleteCookieByMethod = async (method: 'proxy' | 'action', response?: NextResponse<unknown>): Promise<NextResponse<unknown> | string | undefined> => {
    const maxAge = 0;
    const expires = new Date(maxAge);
    const cookePartial = getResponseCookiePartial(maxAge, expires);

    switch (method) {
        case 'proxy': {
            if (!response) {
                throw new Error('Missing response object Param!');
            }
            response.cookies.set('session', '', cookePartial);
            return response;
        }
        case 'action': {
            const cookieStore = await cookies();
            const sessionId = cookieStore.get('session')?.value;
            cookieStore.set('session', '', cookePartial);
            return sessionId;
        }
    }
};

export {
    createCookie,
    deleteCookieByMethod
}