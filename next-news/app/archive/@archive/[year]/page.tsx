import { ReactElement } from "react";

import NewsList from "../../../../components/archive/news-list";
import { getNewsByYear } from "../../../../lib/api";

const FilteredNews = async ({ params }: { params: Promise<{ year: string }> }): Promise<ReactElement> => {
    const { year } = await params;
    const news = getNewsByYear(year);

    return (
        <NewsList news={news} />
    );
};

export default FilteredNews;