import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles['loader-wrapper']}>
            <span className={styles.loader} />
            <span className={styles['loading-text']}>Loading posts...</span>
        </div>
    );
};

export default Loader;