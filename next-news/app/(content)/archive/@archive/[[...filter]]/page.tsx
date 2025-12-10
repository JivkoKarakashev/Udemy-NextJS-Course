import { ReactElement, Suspense } from "react";
import Link from "next/link";

import NewsList from "@/components/archive/news-list.tsx";
import { getAvailableMonthsByYear, getAvailableYears, getNewsByYear, getNewsByYearAndMonth } from "@/lib/api.ts";
import { News } from "@/types/news";
import Loader from "@/components/loader/loading.tsx";

const FilteredNews = async ({ params }: { params: Promise<{ filter: Array<string | undefined & string | undefined> | undefined }> }): Promise<ReactElement> => {
    const { filter } = await params;
    // console.log(`Filter: ${filter}`);

    let news: News[] | undefined = undefined;
    let selectedYear: string | undefined = undefined;
    let selectedMonth: string | undefined = undefined;

    const availableYears = await getAvailableYears();
    let availableMonths: string[] = [];
    availableYears.forEach(async (year) => {
        const availMonthsByYear = await getAvailableMonthsByYear(year);
        availableMonths.push(...availMonthsByYear);
        // console.log(availableMonths);
    });
    let filtersArr = [...availableYears];

    if (filter) {
        selectedYear = filter.at(0);
        selectedMonth = filter.at(1);
        // console.log(`Year: ${selectedYear}`);
        // console.log(`Month: ${selectedMonth}`);
        if (selectedYear && !selectedMonth) {
            availableMonths = await getAvailableMonthsByYear(selectedYear);
            news = await getNewsByYear(selectedYear);
            filtersArr = [...availableMonths];
        }

        if (selectedYear && selectedMonth) {
            news = await getNewsByYearAndMonth(selectedYear, selectedMonth);
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

const FilteredNewsPage = ({ params }: { params: Promise<{ filter: Array<string | undefined & string | undefined> | undefined }> }): ReactElement => {
    return (
        <Suspense fallback={<Loader content="Loading filtered news..." />}>
            <FilteredNews params={params} />
        </Suspense>
    );
};

export default FilteredNewsPage;