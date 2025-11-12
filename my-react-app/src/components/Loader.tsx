import type { ReactElement } from "react";

import styles from "./Loader.module.scss";

interface LoaderProps {
    text: string
}

const Loader = ({ text }: LoaderProps): ReactElement => {
    return (
        <div className={styles['loader-wrapper']}>
            <span className={styles.loader} />
            {/* <span className={styles['loading-text']}>Loading posts...</span> */}
            <span className={styles['loading-text']}>Loading {text}...</span>
        </div>
    );
};

export default Loader;