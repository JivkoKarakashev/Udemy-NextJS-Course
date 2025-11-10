import { useState, type ReactElement, useEffect } from "react";

import styles from "./Posts-list.module.scss";

import Post from "./Post.tsx";
import Loader from "./Loader.tsx";
import { usePostsStore } from "../store/postsStore.ts";

const PostsList = (): ReactElement => {
    const { posts, fetchPosts } = usePostsStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPosts()
            .then(() => setIsLoading(false))
            .catch(err => {
                setIsLoading(false);
                console.error('Error on fetch all posts!', err);
                alert('Error on fetch all posts!');
            });
    }, [fetchPosts]);

    return (
        <>
            {isLoading && (
                <Loader text='posts' />
            )}
            {!isLoading && posts.length > 0 && (
                <ul className={styles['posts-wrapper']}>
                    {posts.map((post) => <Post {...post} key={post._id} />)}
                </ul>
            )}
            {!isLoading && posts.length === 0 && (
                <div className={styles['no-posts']}>
                    <h2>There are no posts yet.</h2>
                    <p>Be the first to add some!</p>
                </div>
            )}
        </>
    );
}

export default PostsList;