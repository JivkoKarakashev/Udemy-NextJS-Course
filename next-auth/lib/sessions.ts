import { db } from "@/initdb.ts";
import { SESSION_TTL, Session } from "@/types/session.ts";
import { generateSecureRandomString as generateSessionId } from "@/utils/secure-random-string.ts";

const createSession = (userId: number | bigint): Session => {
    const sessionId = generateSessionId();
    const createdAt = Date.now();
    const expiresAt = createdAt + SESSION_TTL;

    const stmt = db.prepare<Session>(`
        INSERT INTO sessions (id, createdAt, expiresAt, userId)
        VALUES (@id, @createdAt, @expiresAt, @userId)
    `);
    stmt.run({ id: sessionId, createdAt, expiresAt, userId });

    return {
        id: sessionId,
        createdAt,
        expiresAt,
        userId
    };
};

const validateSession = (sessionId: string): Session | undefined => {
    const stmt = db.prepare<{ sessionId: string }, Session>(`
        SELECT * FROM sessions WHERE id = @sessionId
    `);
    const now = Date.now();
    const session = stmt.get({ sessionId });
    const expired = session && session.expiresAt < now;

    if (session === undefined || expired) {
        if (expired) {
            deleteSession(sessionId);
        }
        return undefined;
    }

    return session;
};

const deleteSession = (sessionId: string): void => {
    const stmt = db.prepare<{ sessionId: string }>(`DELETE FROM sessions WHERE id = @sessionId`);
    stmt.run({ sessionId });
};

const cleanupExpiredSessions = (): void => {
    const now = Date.now();
    const stmt = db.prepare<{ now: number }>(`
        DELETE FROM sessions WHERE expiresAt < @now
    `);
    const info = stmt.run({ now });
    console.log(`Cleaned up ${info.changes} expired sessions.`);
};

export {
    createSession,
    validateSession,
    deleteSession,
    cleanupExpiredSessions
}