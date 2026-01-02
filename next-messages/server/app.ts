import express from 'express';

const app = express();
const serverPort = 3030;

app.get('/messages', (req, res) => {
  const requestSource = req.get('x-id');
  console.log(`${new Date().toISOString()}: EXECUTING /messages on backend from ${requestSource}`);
  res.json([
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Another message from the separate backend' },
  ]);
});

app.listen(serverPort, () => {
  console.log(`Server is listening on http://localhost:${serverPort}`);
});
