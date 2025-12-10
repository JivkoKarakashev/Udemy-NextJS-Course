import { ReactElement, Suspense } from "react";

import { getLatestNews } from "@/lib/api.ts";
import NewsList from "@/components/archive/news-list.tsx";
import Loader from "@/components/loader/loading.tsx";

const LatestNews = async (): Promise<ReactElement> => {
    const news = await getLatestNews();

    return (
        <NewsList news={news} />
    );
};

const LatestNewsPage = (): ReactElement => {
    return (
        <Suspense fallback={<Loader content="Loading latest news..." />}>
            <h2>Latest News</h2>
            <LatestNews />
        </Suspense>
    );
};

export default LatestNewsPage;