import { ReactElement } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import { dummyNews } from "../../../../constants/dummy-news.ts";
import Link from "next/link";

const Details = async ({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> => {
    const { slug } = await params;
    // console.log(slug);
    const newsItm = dummyNews.find(itm => itm.slug === slug);
    if (newsItm === undefined) {
        notFound();
    }
    const { title, imageUrl, date, content } = newsItm;
    // console.log(newsItm);
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

export default Details;