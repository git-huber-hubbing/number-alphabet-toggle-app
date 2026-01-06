const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory state for numbers and letters
let currentNumber = 0;
let currentLetterIndex = 0;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint: get next number
app.get('/api/next-number', (req, res) => {
  currentNumber = (currentNumber + 1) % 10; // 0-9 loop
  res.json({ value: currentNumber, mode: 'number' });
});

// API endpoint: get next letter
app.get('/api/next-letter', (req, res) => {
  currentLetterIndex = (currentLetterIndex + 1) % letters.length;
  res.json({ value: letters[currentLetterIndex], mode: 'alphabet' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
