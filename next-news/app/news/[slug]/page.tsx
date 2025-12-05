import { ReactElement } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import { dummyNews } from "../../../constants/dummy-news.ts";

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
                <div className="img-wrapper">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="{max-width: 309px}"
                    />
                </div>
                <h1>{title}</h1>
                <time dateTime={date}>{date}</time>
            </header>
            <p>{content}</p>
        </article>
    );
};

export default Details;