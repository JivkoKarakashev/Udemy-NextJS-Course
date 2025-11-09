const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/data.json');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

async function storePosts(posts) {
  return fs.writeFile(filePath, JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;