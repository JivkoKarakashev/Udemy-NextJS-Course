"use server";

import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import sqlite, { RunResult } from 'better-sqlite3';

import { Message, NewMessage } from '@/types/message.ts';

const db = new sqlite('messages.db');

const getMessages = nextCache(
  cache(async (): Promise<Message[]> => {
    console.log('Fetching messages from db');
    const stmt = db.prepare<[], Message>('SELECT * FROM messages');
    await new Promise((resolve,) => setTimeout(resolve, 1000));
    return stmt.all();
  }),
  ['messages'],
  {
    tags: ['msgs']
  }
);

const addMessage = async (message: NewMessage): Promise<RunResult> => {
  const stmt = db.prepare(`
    INSERT INTO messages (text)
    VALUES (
      @text
    )
  `);
  await new Promise((resolve,) => setTimeout(resolve, 1000));
  return stmt.run(message);
};

const getServerMessages = async (headers?: Record<string, string>): Promise<Message[]> => {

  const cache: RequestCache = 'force-cache';

  const options: RequestInit = {
    headers: headers ?? { 'X-ID': cache },
    cache
  }
  const response = await fetch('http://localhost:3030/messages', options);
  const data = await response.json();
  return data;
};

export {
  getMessages,
  addMessage,
  getServerMessages
}