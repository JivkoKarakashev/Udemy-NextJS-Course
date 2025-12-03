import sql from 'better-sqlite3';
import B2 from 'backblaze-b2';

import { DBMeal, MealInsert, MealShare } from '../types/meal.ts';
import { B2UploadFileResponse, B2UploadUrlResponse, UploadImageResponse } from '../types/b2-bucket.ts';

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
    const { imageUrl, imageFileName, imageFileId } = await uploadImage(meal.image);
    // console.log({ imageUrl, imageFileName, imageFileId });
    const mealInsert: MealInsert = { ...meal, imageUrl, imageFileName, imageFileId };
    const stmt = db.prepare<MealInsert>(`
        INSERT INTO meals
            (slug, title, imageUrl, imageFileName, imageFileId, summary, instructions, creator, creator_email)
                VALUES (
                    @slug,
                    @title,
                    @imageUrl,
                    @imageFileName,
                    @imageFileId,
                    @summary,
                    @instructions,
                    @creator,
                    @creator_email
                )
    `);
    const info = stmt.run(mealInsert);
    console.log(info.changes);
};

const uploadImage = async (imgFile: File): Promise<UploadImageResponse> => {
    const b2 = new B2({
        applicationKeyId: process.env.B2_KEY_ID!,
        applicationKey: process.env.B2_APP_KEY!
    });

    await b2.authorize();
    const uploadUrlRes = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID! });
    const { uploadUrl, authorizationToken } = uploadUrlRes.data as B2UploadUrlResponse;
    const extension = imgFile.name.split('.').pop();
    const fName = `public/uploads/${crypto.randomUUID()}.${extension}`;
    const arrBuffer = await imgFile.arrayBuffer();
    const buffer = Buffer.from(arrBuffer);
    const uploadFileRes = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: fName,
        data: buffer,
        mime: imgFile.type
    });
    const { fileName, fileId } = uploadFileRes.data as B2UploadFileResponse;
    const imageUrl = `${process.env.CDN_BASE_URL}/${fileName}`;
    return {
        imageUrl,
        imageFileName: fileName,
        imageFileId: fileId
    };
};

export {
    getAllMeals,
    getMealBySlug,
    createMeal
}