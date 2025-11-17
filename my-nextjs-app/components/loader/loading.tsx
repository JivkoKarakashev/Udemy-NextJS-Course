import { ReactElement } from "react";

import styles from './loading.module.scss';

const Loader = ({ content }: { content: string }): ReactElement => {
    return (
        <div className={styles['loader-wrapper']}>
            <span className={styles.loader} />
            <span className={styles['loading-text']}>{content}</span>
        </div>
    );
};

export default Loader;