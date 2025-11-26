'use client';

import { ChangeEvent, useEffect, useRef } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.scss';

import ShareMealFormFieldError from './share-form-field-error.tsx';
import { ImagePersistState } from '../../types/meal.ts';

const ImagePicker = ({
    label,
    valid,
    message,
    image,
    setImage,
    shakeTrigger
}: {
    label: string,
    valid: boolean,
    message: string,
    image: ImagePersistState,
    setImage: ({ imgUrl, imgFile }: ImagePersistState) => void,
    shakeTrigger: number
}) => {
    const imgInputRef = useRef<HTMLInputElement | null>(null);

    const onImageUpload = () => {
        imgInputRef.current?.click()
    };

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        const imgFile = e.currentTarget.files?.[0];
        if (!imgFile) {
            const error = 'There is no file attached!';
            console.error(error);
            throw new Error(error);
        }
        const imgUrl = URL.createObjectURL(imgFile);
        setImage({ imgUrl, imgFile });
        // console.log({ imgUrl, imgFile });
    };

    useEffect(() => {
        return () => {
            if (image.imgUrl) {
                URL.revokeObjectURL(image.imgUrl);
            }
        }
    }, [image]);

    return (
        <div className={styles.picker}>
            <label htmlFor="image">{label}</label>
            <div className={styles.controls}>
                <div className={`${styles.preview} ${!valid ? styles.invalid: ''}`}>
                    {!image.imgUrl && <p>No image uploaded yet.</p>}
                    {image.imgUrl && <Image src={image.imgUrl} alt='Uploaded image preview' fill />}
                </div>
                <input
                    className={styles.input}
                    type="file"
                    id='image'
                    name='image'
                    data-field-attr="image"
                    accept='image/*'
                    ref={imgInputRef}
                    onChange={onImageChange}
                />
                <button className={styles.button} type="button" onClick={onImageUpload}>Upload an Image</button>
            </div>
            {!valid && (
                <ShareMealFormFieldError
                    key={`image${shakeTrigger}`}
                    message={message}
                />
            )}
        </div>
    );
};

export default ImagePicker