import type { ReactElement } from "react";

import styles from "./Modal.module.scss";

import type { ModalProps } from "../types/modalProps";

const Modal = ({ isOpen, toggleModal, children }: ModalProps): ReactElement => {
    return (
        <>
            <div className={styles.backdrop} onClick={(e) => toggleModal(e)}></div>
            <dialog open={isOpen} className={styles.modal}>
                {children}
            </dialog>
        </>
    );
}

export default Modal;