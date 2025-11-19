import sql from 'better-sqlite3';
import fs from 'node:fs';

import { DBMeal, MealInsert, MealShare } from '../types/meal.ts';

const db = sql('meals.db');

const getAllMeals = async (): Promise<DBMeal[]> => {
    await new Promise((res) => setTimeout(res, 2000));
    // throw new Error('Failed to fetch meals data.');
    return db.prepare<[], DBMeal>('SELECT * FROM meals').all();
};

const getMealBySlug = async (slug: string): Promise<DBMeal | undefined> => {
    await new Promise((res) => setTimeout(res, 2000));
    // throw new Error('Failed to fetch details data.');
    const meal = db.prepare<string, DBMeal>('SELECT * FROM meals WHERE slug = ?').get(slug);
    // if (meal === undefined) {
    //     throw new Error('Details data NOT FOUND!');
    // }
    return meal;
};

const createMeal = async (meal: MealShare) => {
    const extension = meal.image.name.split('.').pop();
    // console.log(extension);
    const fileName = `${meal.slug}.${extension}`;
    // console.log(fileName);
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image has failed!');
        }
    });
    const mealInsert: MealInsert = { ...meal, image: `/images/${fileName}` };
    const stmt = db.prepare<MealInsert>(`
        INSERT INTO meals
            (slug, title, image, summary, instructions, creator, creator_email)
                VALUES (
                    @slug,
                    @title,
                    @image,
                    @summary,
                    @instructions,
                    @creator,
                    @creator_email
                )
    `);
    const info = stmt.run(mealInsert);
    console.log(info.changes);
};

export {
    getAllMeals,
    getMealBySlug,
    createMeal
}