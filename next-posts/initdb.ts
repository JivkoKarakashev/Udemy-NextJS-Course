import Database from "better-sqlite3";

const db = new Database('posts.db');

db.pragma("journal_mode = WAL");

(async function initData() {
   db.exec(`
      CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY, 
         firstName TEXT, 
         lastName TEXT,
         email TEXT
      )
   `);
   db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
         id INTEGER PRIMARY KEY, 
         imageUrl TEXT NOT NULL,
         imageFileName TEXT NOT NULL,
         imageFileId TEXT NOT NULL,
         title TEXT NOT NULL, 
         content TEXT NOT NULL, 
         createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
         userId INTEGER, 
         FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
      )`
   );
   db.exec(`
      CREATE TABLE IF NOT EXISTS likes (
         userId INTEGER, 
         postId INTEGER, 
         PRIMARY KEY(userId, postId),
         FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE, 
         FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
      )
   `);

   db.exec(`
      CREATE INDEX IF NOT EXISTS idx_posts_userId 
      ON posts(userId)
   `);

   db.exec(`
      CREATE INDEX IF NOT EXISTS idx_likes_postId 
      ON likes(postId)
   `);

   db.exec(`
      CREATE INDEX IF NOT EXISTS idx_posts_createdAt 
      ON posts(createdAt)
   `);

   // Creating two dummy users if they don't exist already
   const stmt = db.prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM users');

   if (stmt.get()?.count === 0) {
      db.exec(`
         INSERT INTO users (firstName, lastName, email)
         VALUES ('John', 'Doe', 'john@example.com')
      `);

      db.exec(`
         INSERT INTO users (firstName, lastName, email)
         VALUES ('Max', 'Schwarz', 'max@example.com')
      `);
   }
})();
