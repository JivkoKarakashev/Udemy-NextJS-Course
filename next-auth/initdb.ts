import Sqlite from "better-sqlite3";

const db = new Sqlite('training.db');

db.pragma("journal_mode = WAL");

(async function initDb() {
   db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
      );
   `);

   db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
         id INTEGER PRIMARY KEY,
         expiresAt INTEGER NOT NULL,
         userId INTEGER,
         FOREIGN KEY (userId) REFERENCES users(id)
      );
   `);

   db.exec(`
      CREATE TABLE IF NOT EXISTS trainings (
         id INTEGER PRIMARY KEY,
         title TEXT,
         image TEXT,
         description TEXT
      );
   `);

   db.exec(`
      CREATE INDEX IF NOT EXISTS idx_sessions_userId 
      ON sessions(userId)
   `);

   db.exec(`
      CREATE INDEX IF NOT EXISTS idx_sessions_expiresAt 
      ON sessions(expiresAt)
   `);

   // Initial database population if the number of records is zero
   const stmt = db.prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM trainings');

   if (stmt.get()?.count === 0) {
      db.exec(`
         INSERT INTO trainings (title, image, description)
         VALUES 
         ('Yoga', '/yoga.jpg', 'A gentle way to improve flexibility and balance.'),
         ('Boxing', '/boxing.jpg', 'A high-energy workout that improves strength and speed.'),
         ('Running', '/running.jpg', 'A great way to improve cardiovascular health and endurance.'),
         ('Weightlifting', '/weightlifting.jpg', 'A strength-building workout that helps tone muscles.'),
         ('Cycling', '/cycling.jpg', 'A low-impact workout that improves cardiovascular health and endurance.'),
         ('Gaming', '/gaming.jpg', 'A fun way to improve hand-eye coordination and reflexes.'),
         ('Sailing', '/sailing.jpg', 'A relaxing way to enjoy the outdoors and improve balance.');
      `);
   }
})();

export {
   db
}