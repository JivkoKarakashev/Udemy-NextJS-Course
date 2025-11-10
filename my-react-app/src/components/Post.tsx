import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import styles from "./Post.module.scss";
import type { DBPost } from "../types/post.tsx";

const Post = ({ title, text, _id }: DBPost): ReactElement => {

    return (
        <li className={styles['article-wrapper']}>
            <Link className={styles.link} to={`/${_id}`}>
                <article className={styles.article}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.text}>{text}</p>
                </article>
            </Link>
        </li>
    );
}

export default Post;