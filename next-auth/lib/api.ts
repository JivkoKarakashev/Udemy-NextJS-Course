import { db } from '@/initdb.ts';
import { Training } from '@/types/training.ts';
import { RegisterUser } from '@/types/user.ts';

const getAllTrainings = (): Training[] => {
  const stmt = db.prepare<[], Training>('SELECT * FROM trainings');
  return stmt.all();
};

const createUser = ({ email, hash }: RegisterUser): number | bigint => {
  const stmt = db.prepare<RegisterUser>(`
    INSERT INTO users (email, password)
    VALUES (@email, @hash)
  `);
  const result = stmt.run({ email, hash }).lastInsertRowid;
  return result;
};

export {
  getAllTrainings,
  createUser
}