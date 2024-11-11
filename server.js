const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
  const { content } = req.body;
  fs.writeFileSync('saved_text.txt', content);
  res.json({ success: true });
});

app.get('/load', (req, res) => {
  try {
    const content = fs.readFileSync('saved_text.txt', 'utf-8');
    res.json({ content });
  } catch (error) {
    res.json({ content: '' });
  }
});

app.listen(port, () => {
  console.log(`Snsupear Editor running at http://localhost:${port}`);
});