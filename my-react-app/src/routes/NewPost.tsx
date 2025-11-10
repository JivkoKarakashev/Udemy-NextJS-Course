import { type ReactElement, type FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './NewPost.module.scss';

import Modal from '../components/Modal.tsx';
import { useNewPostStore } from '../store/newPostStore.ts';
import { usePostsStore } from '../store/postsStore.ts';
import { useModalStore } from '../store/modalStore.ts';

const NewPost = (): ReactElement => {

    const { formState, onFieldChange, clearForm } = useNewPostStore();
    const { addPost } = usePostsStore();
    const { toggleModal } = useModalStore();
    const navigate = useNavigate();

    useEffect(() => toggleModal(), [toggleModal]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPost(formState)
            .then(() => {
                clearForm();
                toggleModal();
                navigate('..');
            })
            .catch(err => {
                console.error('Error on new Post creation!:', err);
                alert('Error on new Post creation!:');
            });

    };


    return (
        <>
            <Modal>
                <form className={styles.form} method='post' onSubmit={(e) => submitHandler(e)}>
                    <p>
                        <label className={styles.label} htmlFor="title">Title</label>
                        <input className={styles.input} type="text" name="title" id='title' data-field='title' value={formState.title} onChange={(e) => onFieldChange(e)} required />
                    </p>
                    <p>
                        <label className={styles.label} htmlFor="text">Text</label>
                        <textarea className={styles.textarea} id="text" name="text" rows={3} data-field='text' value={formState.text} onChange={(e) => onFieldChange(e)} required />
                    </p>
                    <p>
                        <label className={styles.label} htmlFor="author">Your name</label>
                        <input className={styles.input} type="text" name="author" id="author" data-field='author' value={formState.author} onChange={(e) => onFieldChange(e)} required />
                    </p>
                    <p className={styles.actions}>
                        <Link className={`${styles.button} ${styles.cancel}`} to='..' onClick={toggleModal}>Cancel</Link>
                        <button className={styles.button} type='submit'>Submit</button>
                    </p>
                </form>
            </Modal>
        </>
    );
}

export default NewPost;
