import { db } from '@/initdb.ts';
import { Training } from '@/types/training.ts';

const getAllTrainings = async (): Promise<Training[]> => {
  const stmt = db.prepare<[], Training>('SELECT * FROM trainings');
  await new Promise((resolve,) => setTimeout(resolve, 1000));
  return stmt.all();
};

export {
  getAllTrainings
}