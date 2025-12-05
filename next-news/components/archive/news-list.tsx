import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

import { News } from "../../types/news";

const NewsList = ({ news }: { news: News[] }): ReactElement => {
    return (
        <ul className='news-list'>
            {news.map(newsItm => {
                const { id, slug, title, imageUrl } = newsItm;
                return (
                    <li key={id}>
                        <Link href={`/news/${slug}`}>
                            <div className="img-wrapper">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    sizes="{max-width: 309px}"
                                />
                            </div>
                            <span>{title}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NewsList;