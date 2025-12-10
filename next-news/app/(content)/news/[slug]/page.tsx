import { ReactElement, Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Loader from "@/components/loader/loading.tsx";
import { getNewsBySlug } from "@/lib/api.ts";

const Details = async ({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> => {
    const { slug } = await params;
    // console.log(slug);
    const newsDetails = await getNewsBySlug(slug);
    if (newsDetails === undefined) {
        notFound();
    }
    const { title, imageUrl, date, content } = newsDetails;
    // console.log(newsDetails);
    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${slug}/image`} >
                    <div className="img-wrapper">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            loading='eager'
                            sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </Link>
                <h1>{title}</h1>
                <time dateTime={date}>{date}</time>
            </header>
            <p>{content}</p>
        </article>
    );
};

const DetailsPage = ({ params }: { params: Promise<{ slug: string }> }): ReactElement => {
    return (
        <Suspense fallback={<Loader content="Loading details..." />}>
            <Details params={params} />
        </Suspense >
    );
};

export default DetailsPage;