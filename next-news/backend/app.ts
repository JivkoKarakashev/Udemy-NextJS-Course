import express from 'express';
import sqlite from 'better-sqlite3';
import cors from 'cors';

const db = sqlite('news.db');

const app = express();
const listeningPort = 3030;

app.use(cors())

app.get('/news', (req, res) => {
  const news = db.prepare('SELECT * FROM news').all();
  res.json(news);
});

app.listen(listeningPort, () => {
  console.log(`Server is listening on http://localhost:${listeningPort}`);
});
