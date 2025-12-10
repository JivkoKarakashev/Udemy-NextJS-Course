import sqlite from 'better-sqlite3';

import { News } from '@/types/news.ts';

const db = sqlite('news.db');

// const getAllNews = async (): Promise<News[]> => {
//     const res = await fetch('http://localhost:3030/news');
//     if (!res.ok) {
//         throw new Error("Failed to fetch news");
//     }
//     return res.json();
// };
const getAllNews = async (): Promise<News[]> => {
    const stmt = db.prepare<[], News>('SELECT * FROM news');
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all();
};

const getLatestNews = async (): Promise<News[]> => {
    const stmt = db.prepare<[], News>('SELECT * FROM news ORDER BY date DESC LIMIT 3');
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all();
};

const getNewsBySlug = async (slug: string): Promise<News | undefined> => {
    const stmt = db.prepare<string, News>('SELECT * FROM news WHERE slug = ?');
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.get(slug);
};

const getAvailableYears = async (): Promise<string[]> => {
    const stmt = db.prepare<[], { year: string }>(`SELECT DISTINCT strftime('%Y', date) as year FROM news`);
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all().map(({ year }) => year);
};

const getAvailableMonthsByYear = async (year: string): Promise<string[]> => {
    const stmt = db.prepare<string, { month: string }>(
        `SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?`
    );
    // await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all(year).map(({ month }) => month);
};

const getNewsByYear = async (year: string): Promise<News[]> => {
    const stmt = db.prepare<string, News>(
        `SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC`
    );
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all(year);
};

const getNewsByYearAndMonth = async (year: string, month: string): Promise<News[]> => {
    const stmt = db.prepare<[string, string], News>(
        `SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC`
    );
    await new Promise((res,) => setTimeout(res, 2000));
    return stmt.all(year, month);
};

export {
    getAllNews,
    getNewsBySlug,
    getLatestNews,
    getAvailableYears,
    getAvailableMonthsByYear,
    getNewsByYear,
    getNewsByYearAndMonth
}