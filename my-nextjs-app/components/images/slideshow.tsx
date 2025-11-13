'use client';

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";

import styles from './slideshow.module.scss';
import { slideshowImages } from "../../constants/slideshowImages.ts";

const Slideshow = (): ReactElement => {
    const [currImgIdx, setCurrImgIdx] = useState(0);
    const images = [...slideshowImages];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrImgIdx((prevIdx) =>
                prevIdx < images.length - 1 ? prevIdx + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.slideshow}>
            {images.map((img, idx) => (
                <Image
                    key={idx}
                    src={img.img}
                    className={idx === currImgIdx ? styles.active : ''}
                    alt={img.alt}
                />
            ))}
        </div>
    );
};

export default Slideshow;