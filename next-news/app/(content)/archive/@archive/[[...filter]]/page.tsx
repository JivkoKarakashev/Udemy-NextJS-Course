import { ReactElement, Suspense } from "react";
import Link from "next/link";

import NewsList from "@/components/archive/news-list.tsx";
import { getAvailableMonthsByYear, getAvailableYears, getNewsByYear, getNewsByYearAndMonth } from "@/lib/api.ts";
import { News } from "@/types/news";
import Loader from "@/components/loader/loading.tsx";

const FilterHeader = async ({ year, month }: { year: string | undefined, month: string | undefined }): Promise<ReactElement> => {
    let availableYears: string[] = [];
    let availableMonths: string[] = [];
    let filtersArr: string[] = [];

    availableYears = await getAvailableYears();
    filtersArr = [...availableYears];

    if (year) {
        availableMonths = await getAvailableMonthsByYear(year);
        filtersArr = [...availableMonths];
    }

    if (year && month) {
        filtersArr = [];
    }

    if ((year && !availableYears.includes(year)) ||
        month && !availableMonths.includes(month)) {
        // console.log(`AvailableYears: ${availableYears}`);
        // console.log(`SelectedYear: ${year}`);
        // console.log(`AvailableMonths: ${availableMonths}`);
        // console.log(`SelectedMonth: ${month}`);
        // console.log(filtersArr);
        throw new Error('Invalid filter!');
    }

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {filtersArr.map(filter => {
                        const href = (year !== undefined)
                            ? `/archive/${year}/${filter}`
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
    );
};

const FilteredNews = async ({ year, month }: { year: string | undefined, month: string | undefined }): Promise<ReactElement> => {
    let news: News[] | undefined = undefined;

    // console.log(`Year: ${year}`);
    // console.log(`Month: ${month}`);
    if (year && !month) {
        news = await getNewsByYear(year);
    }

    if (year && month) {
        news = await getNewsByYearAndMonth(year, month);
    }

    return (
        <>
            {news && news.length && <NewsList news={news} />}
            {(!news || !news.length) && <p>No news found for the selected period.</p>}
        </>
    );
};

const FilteredNewsPage = async ({ params }: { params: Promise<{ filter: Array<string | undefined & string | undefined> | undefined }> }): Promise<ReactElement> => {
    let year: string | undefined = undefined;
    let month: string | undefined = undefined;

    const { filter } = await params;
    if (filter) {
        year = filter.at(0);
        month = filter.at(1);
        // console.log(`SelectedYear: ${year}`);
        // console.log(`SelectedMonth: ${month}`);
    }

    return (
        <>
            <Suspense fallback={<Loader content="Loading filters..." />}>
                <FilterHeader year={year} month={month} />
            </Suspense>

            <Suspense fallback={<Loader content="Loading filtered news..." />}>
                <FilteredNews year={year} month={month} />
            </Suspense>
        </>
    );
};

export default FilteredNewsPage;