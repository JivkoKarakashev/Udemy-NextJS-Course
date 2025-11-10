import type { AddPostData, DBPost } from "../types/post.tsx";

const API_URL = 'http://localhost:3000/posts';

const getAllPosts = async (): Promise<DBPost[]> => {
    const options: RequestInit = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
    };

    return fetch(API_URL, options)
        .then(res => res.json())
        .then(({ posts }) => posts)
        .catch(err => { throw err });

};

const createPost = async (post: AddPostData): Promise<DBPost> => {
    const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(post)
    };

    return fetch(API_URL, options)
        .then(res => res.json())
        .then(({ post }) => post)
        .catch(err => { throw err });
};

const getPostById = async (id: string): Promise<DBPost> => {
    const options: RequestInit = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
    };

    return fetch(`${API_URL}/${id}`, options)
        .then(res => res.json())
        .then(({ post }) => post)
        .catch(err => { throw err });
};

export {
    getAllPosts,
    createPost,
    getPostById
}