import sqlite, { RunResult } from 'better-sqlite3';

import { GetPost, NewPost } from '@/types/post.ts';
import { UpdateLikeStatusParams } from '@/types/like.ts';

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

const insertPost = async (post: NewPost): Promise<RunResult> => {

    const stmt = db.prepare(`
      INSERT INTO posts (imageUrl, imageFileName, imageFileId, title, content, userId)
      VALUES (
        @imageUrl,
        @imageFileName,
        @imageFileId,
        @title,
        @content,
        @userId
    )
    `);
    await new Promise((resolve,) => setTimeout(resolve, 1000));
    return stmt.run(post);
}

const updateLikeStatusByPost = async (params: UpdateLikeStatusParams): Promise<RunResult> => {
    // const { userId, postId } = params;
    // console.log(`UserId: ${userId}`);
    // console.log(`PostId: ${postId}`);

    const stmt = db.prepare<[params: UpdateLikeStatusParams], { count: number }>(`
        SELECT COUNT(*) AS count
        FROM likes
        WHERE userId = @userId
        AND postId = @postId
    `);

    const isLiked = stmt.get(params)?.count === 0;

    if (isLiked) {
        const stmt = db.prepare<[params: UpdateLikeStatusParams]>(`
            INSERT INTO likes (userId, postId)
            VALUES (@userId, @postId)
        `);
        await new Promise((resolve,) => setTimeout(resolve, 1000));
        return stmt.run(params);
    } else {
        const stmt = db.prepare<[params: UpdateLikeStatusParams]>(`
            DELETE FROM likes
            WHERE userId = @userId 
            AND postId = @postId
        `);
        await new Promise((resolve,) => setTimeout(resolve, 1000));
        return stmt.run(params);
    }
}

export {
    getPosts,
    insertPost,
    updateLikeStatusByPost
}