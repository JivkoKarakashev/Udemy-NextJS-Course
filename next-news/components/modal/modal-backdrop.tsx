"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";

const ModalBackdrop = (): ReactElement => {
    const router = useRouter();

    return (
        <div className="modal-backdrop" onClick={router.back}></div>
    );
};

export default ModalBackdrop;