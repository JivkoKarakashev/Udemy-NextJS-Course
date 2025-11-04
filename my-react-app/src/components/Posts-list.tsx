import type { ReactElement } from "react";

import styles from "./Posts-list.module.scss";
import Post from "./Post.tsx";

const PostsList = (): ReactElement => {
    return (
        <ul className={styles['posts-wrapper']}>
            <Post title="React.js" text="React.js is Awesome!" author="Jivko" />
            <Post title="Next.js" text="Next.js is Awesome!" author="Jivko" />
        </ul>
    );
}

export default PostsList;