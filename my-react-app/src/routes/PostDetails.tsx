import { useEffect, useState, type ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './PostDetails.module.scss';

import type { DBPost } from '../types/post.tsx';
import Loader from '../components/Loader.tsx';
import Modal from '../components/Modal.tsx';
import { getPostById } from '../utils/api.tsx';
import { useModalStore } from '../store/modalStore.ts';

const PostDetails = (): ReactElement => {
    const { id } = useParams();
    const { toggleModal } = useModalStore();
    const [details, setDetails] = useState<DBPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            if (!id) {
                throw new Error("Post ID param missing!");
            }
            toggleModal();
            getPostById(id)
                .then((post) => {
                    setIsLoading(false);
                    setDetails(post);
                })
                .catch(err => {
                    setIsLoading(false);
                    console.error('Error on fetch post details!', err);
                    alert('Error on fetch post details!');
                });
        } catch (err) {
            const { message } = err as Error;
            setIsLoading(false);
            console.error('Error on fetch post details!', message);
            alert(message);
        }
    }, [toggleModal, id]);

    return (
        <>
            {isLoading && (
                <Loader text='post' />
            )}
            {!isLoading && !details && (
                <Modal>
                    <article className={styles.details}>
                        <h1>Could not find post</h1>
                        <p>Unfortunately, the requested post could not be found.</p>
                        <p>
                            <Link to=".." className={styles.button}>
                                Okay
                            </Link>
                        </p>
                    </article>
                </Modal>
            )}
            {!isLoading && details && (
                <Modal>
                    <article className={styles.details}>
                        <p className={styles.title}>{details.title}</p>
                        <p className={styles.text}>{details.text}</p>
                        <footer className={styles.footer}>
                            <p>Published on: <time dateTime={details.date.iso}>{details.date.long}</time></p>
                            <p className={styles.author}>Author: {details.author}</p>
                        </footer>
                    </article>
                </Modal>
            )}
        </>
    );
}

export default PostDetails;