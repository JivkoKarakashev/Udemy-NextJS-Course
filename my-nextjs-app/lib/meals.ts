import sql from 'better-sqlite3';

import { Meal } from '../types/meal';

const db = sql('meals.db');

const getAllMeals = async (): Promise<Meal[]> => {
    await new Promise((res) => setTimeout(res, 2000));
    // throw new Error('Failed to fetch meals data.');
    return db.prepare<[], Meal>('SELECT * FROM meals').all();
};

const getMealBySlug = async (slug: string): Promise<Meal | undefined> => {
    await new Promise((res) => setTimeout(res, 2000));
    // throw new Error('Failed to fetch details data.');
    const meal = db.prepare<string, Meal>('SELECT * FROM meals WHERE slug = ?').get(slug);
    // if (meal === undefined) {
    //     throw new Error('Details data NOT FOUND!');
    // }
    return meal;
};

export {
    getAllMeals,
    getMealBySlug
}