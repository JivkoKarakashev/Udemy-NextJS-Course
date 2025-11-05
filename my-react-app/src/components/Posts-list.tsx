import { useState, type ReactElement } from "react";

import styles from "./Posts-list.module.scss";

import type { NewPostFieldType } from "../types/newPostProps.tsx";
import type { ModalProps } from "../types/modalProps.tsx";

import Modal from "./Modal.tsx";
import NewPost from "./NewPost.tsx";
import Post from "./Post.tsx";

const PostsList = ({ isOpen, toggleModal }: ModalProps): ReactElement => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const changeFieldHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    return (
        <>
            {isOpen && (
                <Modal isOpen={isOpen} toggleModal={toggleModal}>
                    <NewPost onFieldChange={changeFieldHandler} />
                </Modal>
            )}
            <ul className={styles['posts-wrapper']}>
                <Post title="React.js" text="React.js is Awesome!" date={{ iso: '2025-11-04', long: 'November 4, 2025' }} author="Jivko" />
                <Post title="Next.js" text="Next.js is Awesome!" date={{ iso: '2025-11-04', long: 'November 4, 2025' }} author="Jivko" />
            </ul>
        </>
    );
}

export default PostsList;