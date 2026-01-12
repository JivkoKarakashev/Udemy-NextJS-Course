import { db } from '@/initdb.ts';
import { Training } from '@/types/training.ts';
import { AuthUser, RegisterUser } from '@/types/user.ts';

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

const getUserByEmail = (email: string): AuthUser | undefined => {
  const stmt = db.prepare<{ email: string }, AuthUser>(`
    SELECT * FROM users WHERE email = @email
  `);
  const result = stmt.get({ email });
  return result;
};

export {
  getAllTrainings,
  createUser,
  getUserByEmail
}