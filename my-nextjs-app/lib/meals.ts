import sql from 'better-sqlite3';

import { Meal } from '../types/meal';

const db = sql('meals.db');

const getAllMeals = async (): Promise<Meal[]> => {
    await new Promise((res) => setTimeout(res, 2000));
    return db.prepare<[], Meal>('SELECT * FROM meals').all();
};

export {
    getAllMeals
}