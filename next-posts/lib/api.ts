import sqlite, { RunResult } from 'better-sqlite3';

import { GetPost, NewPost } from '@/types/post';

const db = sqlite('posts.db');

const getPosts = async (limit?: number): Promise<GetPost[]> => {
    const limitClause = (limit)
        ? 'LIMIT ?'
        : '';

    const stmt = db.prepare<[number?], GetPost>(`
      SELECT 
        posts.id, 
        imageUrl, 
        title, 
        content, 
        createdAt, 
        firstName AS userFirstName, 
        lastName AS userLastName, 
        COUNT(likes.postId) AS likes,
        EXISTS(
            SELECT * FROM likes 
            WHERE likes.postId = posts.id 
            AND likes.userId = 2
        ) AS isLiked
      FROM posts
      INNER JOIN users ON posts.userId = users.id
      LEFT JOIN likes ON posts.id = likes.postId
      GROUP BY posts.id
      ORDER BY createdAt DESC
      ${limitClause}`
    );

    await new Promise((resolve,) => setTimeout(resolve, 1000));

    return (limit)
        ? stmt.all(limit)
        : stmt.all();
}

const insertPost = async ({ imageUrl, title, content, userId }: NewPost): Promise<RunResult> => {
    const stmt = db.prepare<[string, string, string, number]>(`
      INSERT INTO posts (imageUrl, title, content, userId)
      VALUES (?, ?, ?, ?)
    `);
    await new Promise((resolve,) => setTimeout(resolve, 1000));
    return stmt.run(imageUrl, title, content, userId);
}

const updateLikeStatusByPost = async (postId: number, userId: number): Promise<RunResult> => {
    const stmt = db.prepare<[number, number], { count: number }>(`
        SELECT COUNT(*) AS count
        FROM likes
        WHERE userId = ? 
        AND postId = ?
    `);

    const isLiked = stmt.get(userId, postId)?.count === 0;

    if (isLiked) {
        const stmt = db.prepare<[number, number]>(`
            INSERT INTO likes (userId, postId)
            VALUES (?, ?)
        `);
        await new Promise((resolve,) => setTimeout(resolve, 1000));
        return stmt.run(userId, postId);
    } else {
        const stmt = db.prepare(`
            DELETE FROM likes
            WHERE userId = ? 
            AND postId = ?
        `);
        await new Promise((resolve,) => setTimeout(resolve, 1000));
        return stmt.run(userId, postId);
    }
}

export {
    getPosts,
    insertPost,
    updateLikeStatusByPost
}