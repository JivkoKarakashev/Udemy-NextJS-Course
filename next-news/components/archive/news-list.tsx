import { ReactElement } from "react";
import Link from "next/link";

import { News } from "../../types/news";

const NewsList = ({ news }: { news: News[] }): ReactElement => {
    return (
        <ul className='news-list'>
            {news.map(newsItm => {
                const { id, slug, title, imageUrl } = newsItm;
                return (
                    <li key={id}>
                        <Link href={`/news/${slug}`}>
                            <img src={imageUrl} alt={title}></img>
                            <span>{title}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NewsList;