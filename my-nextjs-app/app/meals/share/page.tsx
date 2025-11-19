'use client';

import { ReactElement, useActionState } from "react";

import styles from './page.module.scss';

import ImagePicker from "../../../components/share/image-picker.tsx";
import ShareButton from "../../../components/share/share-button.tsx";
import { onShareMeal } from "../../../lib/actions.ts";
import { shareMealFormStateInit } from "../../../types/shareMeal-formState.ts";
import ShareMealFormFieldError from "../../../components/share/share-form-field-error.tsx";

const Share = (): ReactElement => {
    const [state, formAction] = useActionState(onShareMeal, shareMealFormStateInit);

    return (
        <>
            <header className={styles.header}>
                <h1>
                    Share your <span className={styles.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={styles.main}>
                <form className={styles.form} action={formAction}>
                    <div className={styles.row}>
                        <p>
                            <label htmlFor="creator">Your name</label>
                            <input type="text" id="creator" name="creator" required />
                            {!state.creator.valid && (<ShareMealFormFieldError message={state.creator.error_message} />)}
                        </p>
                        <p>
                            <label htmlFor="creator_email">Your email</label>
                            <input type="email" id="creator_email" name="creator_email" required />
                            {!state.creator_email.valid && (<ShareMealFormFieldError message={state.creator_email.error_message} />)}
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                        {!state.title.valid && (<ShareMealFormFieldError message={state.title.error_message} />)}
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                        {!state.summary.valid && (<ShareMealFormFieldError message={state.summary.error_message} />)}
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows={10}
                            required
                        ></textarea>
                        {!state.summary.valid && (<ShareMealFormFieldError message={state.summary.error_message} />)}
                    </p>
                    <ImagePicker label="" valid={state.image.valid} message={state.image.error_message} />
                    <p className={styles.actions}>
                        {/* <button type="submit">Share Meal</button> */}
                        <ShareButton />
                    </p>
                </form>
            </main>
        </>
    );
}

export default Share;
