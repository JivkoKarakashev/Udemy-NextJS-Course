import type { ReactElement } from "react";

import styles from "./Post.module.scss";
import type { PostProps } from "../types/postProps";

const Post = (props: PostProps): ReactElement => {

    return (
        <li>
            <article className={styles.article}>
                <h3 className={styles.title}>{props.title}</h3>
                <p className={styles.text}>{props.text}</p>
                <footer className={styles.footer}>
                    <p>Published on: <time dateTime="2025-11-04">November 4, 2025</time></p>
                    <p>Author: {props.author}</p>
                </footer>
            </article>
        </li>
    );
}

export default Post;