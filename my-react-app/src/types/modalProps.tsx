import type React from "react";
import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean,
    onCloseModal: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void,
    children?: ReactNode
}

export {
    type ModalProps
}