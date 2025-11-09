import type { DBPost } from "../types/post.tsx";

const sortPostsByDate = (posts: DBPost[]) => {
    return posts.sort((a, b) => b.date.iso.localeCompare(a.date.iso));
};

export {
    sortPostsByDate
}