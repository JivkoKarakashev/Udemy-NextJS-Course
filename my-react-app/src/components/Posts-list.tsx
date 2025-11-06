import { useState, type ReactElement } from "react";

import styles from "./Posts-list.module.scss";

import type { ModalProps } from "../types/modalProps.tsx";
import { postsInitState, type NewPostData } from "../types/postProps.tsx";

import Modal from "./Modal.tsx";
import NewPost from "./NewPost.tsx";
import Post from "./Post.tsx";

const PostsList = ({ isOpen, onCloseModal }: ModalProps): ReactElement => {
    const [posts, setPosts] = useState(postsInitState);

    const addPostHandler = (postData: NewPostData) => {
        setPosts((prev) => {
            const updated = [...prev, { ...postData }];
            return updated.sort((a, b) => b.date.iso.localeCompare(a.date.iso));
        });
    };

    return (
        <>
            {isOpen && (
                <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
                    <NewPost onCancel={onCloseModal} onAddPost={addPostHandler} />
                </Modal>
            )}
            {posts.length > 0 && (
                <ul className={styles['posts-wrapper']}>
                    {posts.map((post) => <Post {...post} key={post.title} />)}
                </ul>
            )}
            {posts.length === 0 && (
                <div className={styles['no-posts']}>
                    <h2>There are no posts yet.</h2>
                    <p>Be the first to add some!</p>
                </div>
            )}
        </>
    );
}

export default PostsList;