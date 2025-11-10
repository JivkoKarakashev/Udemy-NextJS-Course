import styles from "./Loader.module.scss";

interface LoaderProps {
    text: string
}

const Loader = ({ text }: LoaderProps) => {
    return (
        <div className={styles['loader-wrapper']}>
            <span className={styles.loader} />
            {/* <span className={styles['loading-text']}>Loading posts...</span> */}
            <span className={styles['loading-text']}>Loading {text}...</span>
        </div>
    );
};

export default Loader;