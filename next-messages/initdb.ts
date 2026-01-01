import Database from "better-sqlite3";

const db = new Database('messages.db');

db.pragma("journal_mode = WAL");

(async function initDb() {
   db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
         id INTEGER PRIMARY KEY, 
         text TEXT
      )
   `);
})();
