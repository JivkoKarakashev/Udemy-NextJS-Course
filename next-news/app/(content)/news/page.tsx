import { ReactElement } from 'react';

// import styles from './page.module.scss';

import NewsList from '../../../components/archive/news-list';
import { getAllNews } from '../../../lib/api.ts';

const News = (): ReactElement => {
    const news = getAllNews();
    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news} />
        </>
    );
};

export default News;