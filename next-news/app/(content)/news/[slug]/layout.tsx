import { ReactElement, ReactNode } from "react";

const DetailsLayout = ({ modal, children }: { modal: ReactNode, children: ReactNode }): ReactElement => {
    return (
        <>
            {modal}
            {children}
        </>
    );
};

export default DetailsLayout;