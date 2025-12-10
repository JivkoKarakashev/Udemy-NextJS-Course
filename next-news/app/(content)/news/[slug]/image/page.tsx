import { ReactElement, Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import styles from './page.module.scss';

import Loader from "@/components/loader/loading.tsx";
import { getNewsBySlug } from "@/lib/api.ts";

const AsyncImage = async ({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> => {
    const { slug } = await params;
    const newsItm = await getNewsBySlug(slug);
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

const ImagePage = ({ params }: { params: Promise<{ slug: string }> }): ReactElement => {
    return (
        <Suspense fallback={<Loader content="Loading image..." />}>
            <AsyncImage params={params} />
        </Suspense>
    );
};

export default ImagePage;