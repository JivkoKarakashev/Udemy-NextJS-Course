import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import type { PostsStore } from "../types/postsStore.tsx";
import { sortPostsByDate } from "../utils/sortPosts.tsx";
import { createPost, getAllPosts } from "../utils/api.tsx";
import { getDateStamp } from "../utils/stampDate.tsx";

const store: StateCreator<PostsStore> = (set, get) => ({
    posts: [],
    fetchPosts: async () => {
        const posts = await getAllPosts();
        const sorted = sortPostsByDate(posts);
        set(() => ({ posts: [...sorted] }));
        return get().posts;
    },
    addPost: async (formData) => {
        const date = getDateStamp();
        const newPost = await createPost({ ...formData, date });
        const currPosts = get().posts;
        const sorted = sortPostsByDate([...currPosts, newPost]);
        set(() => ({ posts: [...sorted] }));
        return newPost;
    }
});

const usePostsStore =
    import.meta.env.DEV
        ? create(devtools(store, { name: 'PostsStore' }))
        : create(store);

export {
    usePostsStore
} 