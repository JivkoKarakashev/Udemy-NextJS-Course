import type { ReactElement } from 'react';

import styles from './NewPost.module.scss';
import type { NewPostProps } from '../types/newPostProps.tsx';

const NewPost = ({ onFieldChange }: NewPostProps): ReactElement => {
    return (
        <form className={styles.form}>
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' data-field='title' onChange={(e) => onFieldChange(e)} required />
            </p>
            <p>
                <label htmlFor="text">Text</label>
                <textarea id="text" rows={3} data-field='text' onChange={(e) => onFieldChange(e)} required />
            </p>
            <p>
                <label htmlFor="author">Your name</label>
                <input type="text" id="author" data-field='author' onChange={(e) => onFieldChange(e)} required />
            </p>
        </form>
    );
}

export default NewPost;
