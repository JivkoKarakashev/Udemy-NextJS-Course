import { News } from '../types/news.ts';
import { dummyNews } from '../constants/dummy-news.ts';

const getAllNews = (): News[] => {
    return [...dummyNews];
};

const getLatestNews = (): News[] => {
    return dummyNews.slice(0, 3);
};

const getAvailableYears = (): number[] => {
    const years: number[] = [];
    dummyNews.forEach(news => {
        const year = new Date(news.date).getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    return years.sort((a, b) => b - a);
};

const getAvailableMonthsByYear = (year: number): number[] => {
    const months: number[] = [];
    dummyNews.forEach(news => {
        const newsYear = new Date(news.date).getFullYear();
        if (newsYear === Number(year)) {
            const month = new Date(news.date).getMonth();
            if (!months.includes(month)) {
                months.push(month + 1);
            }
        }
    });
    return months.sort((a, b) => b - a);
};

const getNewsByYear = (year: number): News[] => {
    return dummyNews.filter(news => new Date(news.date).getFullYear() === Number(year));
};

const getNewsByYearAndMonth = (year: number, month: number): News[] => {
    return dummyNews.filter(news => {
        const newsYear = new Date(news.date).getFullYear();
        const newsMonth = new Date(news.date).getMonth() + 1;
        return newsYear === Number(year) && newsMonth === Number(month);
    });
};

export {
    getAllNews,
    getLatestNews,
    getAvailableYears,
    getAvailableMonthsByYear,
    getNewsByYear,
    getNewsByYearAndMonth
}