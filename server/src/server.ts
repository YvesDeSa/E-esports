import express from "express";

const app = express();
app.get('/ads', (request, response) => {
  return response.json([
    { id: 1, name: 'League of Legends' },
    { id: 2, name: 'Dota 2' },
    { id: 3, name: 'Call of Duty' },
    { id: 4, name: 'Apex Legends' }
  ])
});

app.listen(3333, () => {
  console.log('🚀 Started server in port 3333');
});