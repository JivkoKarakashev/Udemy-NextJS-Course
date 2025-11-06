import { useState, type ReactElement, type FormEvent } from 'react';

import styles from './NewPost.module.scss';
import type { NewPostFieldType, NewPostProps } from '../types/newPostProps.tsx';
import type { NewPostData } from '../types/postProps.tsx';

import { getCurrentDates } from '../utils/getCurrentDates.tsx';

const NewPost = ({ onCancel, onAddPost }: NewPostProps): ReactElement => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldType: NewPostFieldType = e.currentTarget.dataset.field as NewPostFieldType;
        const fieldValue = e.currentTarget.value;
        // console.log(field);
        // console.log(e.target.value);

        switch (fieldType) {
            case 'title': {
                setTitle(fieldValue);
                break;
            }
            case 'text': {
                setText(fieldValue);
                break;
            }

            case 'author': {
                setAuthor(fieldValue);
                break;
            }
        }
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = getCurrentDates();
        const formData: NewPostData = {
            title,
            text,
            date,
            author
        }
        onAddPost(formData);
        clearForm();
        onCancel();
    };

    const clearForm = (): void => {
        setTitle('');
        setText('');
        setAuthor('');
    };

    return (
        <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
            <p>
                <label className={styles.label} htmlFor="title">Title</label>
                <input className={styles.input} type="text" id='title' data-field='title' value={title} onChange={(e) => onFieldChange(e)} required />
            </p>
            <p>
                <label className={styles.label} htmlFor="text">Text</label>
                <textarea className={styles.textarea} id="text" rows={3} data-field='text' value={text} onChange={(e) => onFieldChange(e)} required />
            </p>
            <p>
                <label className={styles.label} htmlFor="author">Your name</label>
                <input className={styles.input} type="text" id="author" data-field='author' value={author} onChange={(e) => onFieldChange(e)} required />
            </p>
            <p className={styles.actions}>
                <button className={styles.button} type='button' onClick={onCancel}>Cancel</button>
                <button className={styles.button} type='submit'>Submit</button>
            </p>
        </form>
    );
}

export default NewPost;
