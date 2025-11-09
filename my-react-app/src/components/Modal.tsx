import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Modal.module.scss";

import type { ModalProps } from "../types/modal.tsx";
import { useModalStore } from "../store/modalStore.ts";

const Modal = ({ children }: ModalProps): ReactElement => {

    const navigate = useNavigate();

    const onClose = (): void => {
        toggleModal();
        navigate('..');
    }

    const { state, toggleModal } = useModalStore();
    return (
        <>
            <div className={styles.backdrop} onClick={onClose}></div>
            <dialog open={state === 'open'} className={styles.modal}>
                {children}
            </dialog>
        </>
    );
}

export default Modal;