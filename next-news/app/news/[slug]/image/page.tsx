import { ReactElement } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import styles from './page.module.scss';

import { dummyNews } from "../../../../constants/dummy-news.ts";

const ImagePage = async ({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> => {
    const { slug } = await params;
    const newsItm = dummyNews.find(itm => itm.slug === slug);
    if (newsItm === undefined) {
        notFound();
    }
    const { imageUrl, title } = newsItm;
    return (
        <div className={styles['fullscreen-image']}>
            <Image
                src={imageUrl}
                alt={title}
                fill
                loading="eager"
                sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
};

export default ImagePage;