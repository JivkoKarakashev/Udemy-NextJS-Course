import { News } from '../types/news.ts';
import { dummyNews } from '../constants/dummy-news.ts';

const getAllNews = (): News[] => {
    return [...dummyNews];
};

const getLatestNews = (): News[] => {
    return dummyNews.slice(0, 3);
};

const getAvailableNewsYears = (): number[] => {
    const years: number[] = [];
    dummyNews.forEach(news => {
        const year = new Date(news.date).getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    return years.sort((a, b) => b - a);
};

const getAvailableNewsMonths = (year: string): number[] => {
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

const getNewsByYear = (year: string): News[] => {
    return dummyNews.filter(news => new Date(news.date).getFullYear() === Number(year));
};

const getNewsByYearAndMonth = (year: string, month: string): News[] => {
    return dummyNews.filter(news => {
        const newsYear = new Date(news.date).getFullYear();
        const newsMonth = new Date(news.date).getMonth() + 1;
        return newsYear === Number(year) && newsMonth === Number(month);
    });
};

export {
    getAllNews,
    getLatestNews,
    getAvailableNewsYears,
    getAvailableNewsMonths,
    getNewsByYear,
    getNewsByYearAndMonth
}