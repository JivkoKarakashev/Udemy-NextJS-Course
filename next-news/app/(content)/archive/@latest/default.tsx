import { ReactElement } from "react";

import { getLatestNews } from "../../../../lib/api.ts";
import NewsList from "../../../../components/archive/news-list.tsx";

const LatestNews = (): ReactElement => {
    const news = getLatestNews();

    return (
        <>
            <h2>Latest News</h2>
            <NewsList news={news} />
        </>
    );
};

export default LatestNews;