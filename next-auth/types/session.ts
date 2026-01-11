interface Session {
	id: string,
	createdAt: number,
	expiresAt: number,
	userId: number | bigint
}

// const SESSION_TTL = 1000 * 15 * 60; // 15 min
const SESSION_TTL = 1000 * 1 * 60; // 1 min

export {
	type Session,
	SESSION_TTL
}