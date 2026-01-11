import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

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

export {
    createCookie
}