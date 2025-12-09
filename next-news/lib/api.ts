import sqlite from 'better-sqlite3';

import { News } from '../types/news.ts';
import { dummyNews } from '../constants/dummy-news.ts';
import { resolve } from 'path';

// const getAllNews = (): News[] => {
//     return [...dummyNews];
// };
// const getAllNews = async (): Promise<News[]> => {
//     const res = await fetch('http://localhost:3030/news');
//     if (!res.ok) {
//         throw new Error("Failed to fetch news");
//     }
//     return res.json();
// };
const getAllNews = async (): Promise<News[]> => {
    const db = sqlite('news.db');
    const stmt = db.prepare<[], News>('SELECT * FROM news');
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all();
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