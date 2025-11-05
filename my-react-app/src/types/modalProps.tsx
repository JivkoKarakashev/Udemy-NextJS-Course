import type React from "react";
import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean,
    toggleModal: (e: React.MouseEvent<HTMLDivElement>) => void,
    children?: ReactNode
}

export {
    type ModalProps
}