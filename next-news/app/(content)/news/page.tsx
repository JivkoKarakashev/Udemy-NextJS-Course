import { ReactElement, Suspense } from 'react';

// import styles from './page.module.scss';

import NewsList from '@/components/archive/news-list.tsx';
import { getAllNews } from '@/lib/api.ts';
import Loader from '@/components/loader/loading.tsx';

const News = async (): Promise<ReactElement> => {
    const news = await getAllNews();
    return (
        <NewsList news={news} />
    );
};

const NewsPage = (): ReactElement => {
    return (
        <>
            <h1>News Page</h1>
            <Suspense fallback={<Loader content='Loading news...' />}>
                <News />
            </Suspense>
        </>
    );
};

export default NewsPage;