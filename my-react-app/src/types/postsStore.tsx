import type { AddPostData, DBPost } from "./post.tsx";

interface PostsStore {
    posts: DBPost[],
    fetchPosts: () => Promise<DBPost[]>
    addPost: (post: AddPostData) => Promise<DBPost>,
}

export {
    type PostsStore
}