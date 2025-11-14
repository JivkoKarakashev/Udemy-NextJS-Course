import { ReactElement } from "react";

import styles from './loading.module.scss';

const Loader = (): ReactElement => {
    return (
        <div className={styles['loader-wrapper']}>
            <span className={styles.loader} />
            <span className={styles['loading-text']}>Loading meals...</span>
        </div>
    );
};

export default Loader;