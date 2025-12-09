"use client";

import { ReactElement, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";

import styles from './page.module.scss';

import { dummyNews } from "../../../../../../constants/dummy-news.ts";

const InterceptedImagePage = ({ params }: { params: Promise<{ slug: string }> }): ReactElement => {
    const router = useRouter();
    const { slug } = use(params);
    const newsItm = dummyNews.find(itm => itm.slug === slug);
    if (newsItm === undefined) {
        notFound();
    }
    const { imageUrl, title } = newsItm;
    return (
        <>
            <div className="modal-backdrop" onClick={router.back}></div>
            <dialog className="modal" open>
                <div className={styles['fullscreen-image']}>
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        loading='eager'
                        sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </dialog>
        </>
    );
};

export default InterceptedImagePage;