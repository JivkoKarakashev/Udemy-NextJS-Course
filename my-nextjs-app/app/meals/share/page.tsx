'use client';

import { ChangeEvent, ReactElement, useState } from "react";

import styles from './page.module.scss';

import ImagePicker from "../../../components/share/image-picker.tsx";
import ShareButton from "../../../components/share/share-button.tsx";
import { shareMeal } from "../../../lib/actions.ts";
import { FieldType, PersistState, formStateInit, FieldState } from "../../../types/shareMeal-formState.ts";
import ShareMealFormFieldError from "../../../components/share/share-form-field-error.tsx";
import { ImagePersistState } from "../../../types/meal.ts";

const Share = (): ReactElement => {
    const [image, setImage] = useState<ImagePersistState>({ imgUrl: null, imgFile: null });

    const setImageHandler = ({ imgUrl, imgFile }: ImagePersistState): void => {
        setImage({ imgUrl, imgFile });
    }

    const [persistState, setPersistState] = useState<PersistState>({ validState: 'initial', formState: formStateInit });
    const [shakeTrigger, setshakeTrigger] = useState<number>(0);

    const formFieldStateUpdate = (nextFieldState: FieldState, field: FieldType) => {
        setPersistState(({ validState, formState }) => {
            return {
                validState,
                formState: {
                    ...formState,
                    [field]: {
                        ...formState[field],
                        ...nextFieldState
                    }
                }
            }
        });
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = e.currentTarget.dataset.fieldAttr as Exclude<FieldType, 'image'>;
        if (!field) {
            const error = 'Missing field attribute!';
            console.error(error);
            throw new Error(error);
        }
        const value = e.currentTarget.value;
        const nextFieldState: FieldState = { ...persistState.formState[field], value };
        formFieldStateUpdate(nextFieldState, field);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormData = new FormData(e.currentTarget);
        // console.log(formData);
        const formImage: File = formData.get('image') as File;
        if (!formImage || !formImage.size) {
            const persistImageFile = image.imgFile;
            if (persistImageFile && persistImageFile.size) {
                formData.set('image', persistImageFile);
            }
        }
        // console.log(formData);
        const { validState, formState } = await shareMeal(formData);
        if (validState === false) {
            Object.entries(formState).forEach(kvp => {
                const [field, value] = kvp as [FieldType, FieldState];
                if (field !== 'image') {
                    const nextFieldState: FieldState = { ...persistState.formState[field], ...value };
                    formFieldStateUpdate(nextFieldState, field);
                } else if (field === 'image') {
                    setPersistState(({ validState, formState }) => {
                        return {
                            validState,
                            formState: {
                                ...formState,
                                image: { ...value }
                            }
                        }
                    });
                }

            });
            setshakeTrigger(prev => prev + 1);
            // console.log(persistState);
        }
    };

    return (
        <>
            <header className={styles.header}>
                <h1>
                    Share your <span className={styles.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <div className={styles.row}>
                        <p>
                            <label htmlFor="creator">Your name</label>
                            <input
                                type="text"
                                id="creator"
                                name="creator"
                                data-field-attr="creator"
                                value={persistState.formState.creator.value}
                                onChange={(e) => onInputChange(e)}
                                className={!persistState.formState.creator.valid ? styles.invalid : ''}
                            />
                            {!persistState.formState.creator.valid && (
                                <ShareMealFormFieldError
                                    key={`creator${shakeTrigger}`}
                                    message={persistState.formState.creator.error_message}
                                />
                            )}
                        </p>
                        <p>
                            <label htmlFor="creator_email">Your email</label>
                            <input
                                type="email"
                                id="creator_email"
                                name="creator_email"
                                data-field-attr="creator_email"
                                value={persistState.formState.creator_email.value}
                                onChange={(e) => onInputChange(e)}
                                className={!persistState.formState.creator_email.valid ? styles.invalid : ''}
                            />
                            {!persistState.formState.creator_email.valid && (
                                <ShareMealFormFieldError
                                    key={`creator_email${shakeTrigger}`}
                                    message={persistState.formState.creator_email.error_message}
                                />
                            )}
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            data-field-attr="title"
                            value={persistState.formState.title.value}
                            onChange={(e) => onInputChange(e)}
                            className={!persistState.formState.title.valid ? styles.invalid : ''}
                        />
                        {!persistState.formState.title.valid && (
                            <ShareMealFormFieldError
                                key={`title${shakeTrigger}`}
                                message={persistState.formState.title.error_message}
                            />
                        )}
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text"
                            id="summary"
                            name="summary"
                            data-field-attr="summary"
                            value={persistState.formState.summary.value}
                            onChange={(e) => onInputChange(e)}
                            className={!persistState.formState.summary.valid ? styles.invalid : ''}
                        />
                        {!persistState.formState.summary.valid && (
                            <ShareMealFormFieldError
                                key={`summary${shakeTrigger}`}
                                message={persistState.formState.summary.error_message}
                            />
                        )}
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            data-field-attr="instructions"
                            rows={10}
                            value={persistState.formState.instructions.value}
                            onChange={(e) => onInputChange(e)}
                            className={!persistState.formState.instructions.valid ? styles.invalid : ''}
                        ></textarea>
                        {!persistState.formState.instructions.valid && (
                            <ShareMealFormFieldError
                                key={`instructions${shakeTrigger}`}
                                message={persistState.formState.instructions.error_message}
                            />)}
                    </p>
                    <ImagePicker
                        label=""
                        valid={persistState.formState.image.valid}
                        message={persistState.formState.image.error_message}
                        image={image}
                        setImage={setImageHandler}
                        shakeTrigger={shakeTrigger}
                    />
                    <p className={styles.actions}>
                        <ShareButton />
                    </p>
                </form>
            </main>
        </>
    );
}

export default Share;
