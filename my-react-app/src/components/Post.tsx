import type { ReactElement } from "react";

import styles from "./Post.module.scss";
import type { PostProps } from "../types/postProps.tsx";

const Post = ({ title, text, date, author }: PostProps): ReactElement => {

    return (
        <li>
            <article className={styles.article}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
                <footer className={styles.footer}>
                    <p>Published on: <time dateTime={date.iso}>{date.long}</time></p>
                    <p>Author: {author}</p>
                </footer>
            </article>
        </li>
    );
}

export default Post;