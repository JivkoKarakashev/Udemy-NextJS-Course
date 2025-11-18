import { ReactElement } from "react";

import styles from './page.module.scss';
import ImagePicker from "../../../components/share/image-picker.tsx";
import { onShareMeal } from "../../../lib/actions.ts";

const Share = (): ReactElement => {
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Share your <span className={styles.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={styles.main}>
                <form className={styles.form} action={onShareMeal}>
                    <div className={styles.row}>
                        <p>
                            <label htmlFor="creator">Your name</label>
                            <input type="text" id="creator" name="creator" required />
                        </p>
                        <p>
                            <label htmlFor="creator_email">Your email</label>
                            <input type="email" id="creator_email" name="creator_email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows={10}
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="" />
                    <p className={styles.actions}>
                        <button type="submit">Share Meal</button>
                    </p>
                </form>
            </main>
        </>
    );
}

export default Share;
