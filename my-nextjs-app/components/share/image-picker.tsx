'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.scss';

import ShareMealFormFieldError from './share-form-field-error.tsx';

const ImagePicker = ({ label, valid, message }: { label: string, valid: boolean, message: string }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const imgInputRef = useRef<HTMLInputElement | null>(null);

    const onImageUpload = () => {
        imgInputRef.current?.click()
    };

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e);
        const upload = e.currentTarget.files;
        if (!upload) {
            setUploadedImage(null);
            return;
        }
        const file = upload[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setUploadedImage(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={styles.picker}>
            <label htmlFor="image">{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!uploadedImage && <p>No image uploaded yet.</p>}
                    {uploadedImage && <Image src={uploadedImage} alt='Uploaded image preview' fill />}
                </div>
                <input
                    className={styles.input}
                    type="file"
                    id='image'
                    name='image'
                    accept='image/*'
                    ref={imgInputRef}
                    onChange={onImageChange}
                    required
                />
                {!valid && (<ShareMealFormFieldError message={message} />)}
                <button className={styles.button} type="button" onClick={onImageUpload}>Upload an Image</button>
            </div>
        </div>
    );
};

export default ImagePicker