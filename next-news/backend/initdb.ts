import Database from "better-sqlite3";

import { dummyNews } from "../constants/dummy-news.ts";
import type { NewsInsert } from "../types/news.ts";

const db = new Database('news.db');

db.pragma('')

db.prepare(`
   CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL, 
      imageUrl TEXT NOT NULL
   )
`).run();

(async function initData() {
   const insert = db.prepare<NewsInsert, []>(`
      INSERT INTO news VALUES (
         null,
         @slug,
         @title,
         @content,
         @date,
         @imageUrl
      )
   `);

   const stmt = db.prepare<[], { count: number }>('SELECT COUNT(*) as count FROM news');
   const { count } = stmt.get() ?? { count: 0 };

   if (count === 0) {
      dummyNews.forEach(news => {
         const { slug, title, content, date, imageUrl } = news;
         insert.run({ slug, title, content, date, imageUrl });
      });
   }

})();
