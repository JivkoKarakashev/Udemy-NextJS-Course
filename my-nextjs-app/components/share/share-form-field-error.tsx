import { ReactElement } from "react";

import styles from './share-form-field-error.module.scss';

const ShareMealFormFieldError = ({ message }: { message: string }): ReactElement => {
    return (
        <span className={styles.invalid}>{message}</span>
    );
};

export default ShareMealFormFieldError;