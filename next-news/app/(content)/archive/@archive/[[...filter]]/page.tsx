import { ReactElement } from "react";
import Link from "next/link";

import NewsList from "../../../../../components/archive/news-list.tsx";
import { getAvailableMonthsByYear, getAvailableYears, getNewsByYear, getNewsByYearAndMonth } from "../../../../../lib/api.ts";
import { News } from "../../../../../types/news";

const FilteredNews = async ({ params }: { params: Promise<{ filter: Array<string | undefined & string | undefined> | undefined }> }): Promise<ReactElement> => {
    const { filter } = await params;
    // console.log(`Filter: ${filter}`);

    let news: News[] | undefined = undefined;
    let selectedYear: number | undefined = undefined;
    let selectedMonth: number | undefined = undefined;
    const availableYears = getAvailableYears();
    let availableMonths = availableYears.map(year => getAvailableMonthsByYear(year)).flat();
    let filtersArr = [...availableYears];

    if (filter) {
        selectedYear = Number(filter.at(0));
        selectedMonth = Number(filter.at(1));
        // console.log(`Year: ${selectedYear}`);
        // console.log(`Month: ${selectedMonth}`);
        if (selectedYear && !selectedMonth) {
            availableMonths = getAvailableMonthsByYear(selectedYear);
            news = getNewsByYear(selectedYear);
            filtersArr = [...availableMonths];
        }

        if (selectedYear && selectedMonth) {
            news = getNewsByYearAndMonth(selectedYear, selectedMonth);
            filtersArr = [];
        }

        if (
            (selectedYear && !availableYears.includes(selectedYear))
            || (selectedMonth && !availableMonths.includes(selectedMonth)
            )
        ) {
            // console.log(selectedYear);
            // console.log(filtersArr);
            throw new Error('Invalid filter!');
        }
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {filtersArr.map(filter => {
                            const href = selectedYear
                                ? `/archive/${selectedYear}/${filter}`
                                : `/archive/${filter}`
                            return (
                                <li key={filter}>
                                    <Link href={href}>{filter}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
            {news && news.length && <NewsList news={news} />}
            {(!news || !news.length) && <p>No news found for the selected period.</p>}
        </>
    );


};

export default FilteredNews;