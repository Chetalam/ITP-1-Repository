// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON requests

// Sample Route 1: /api/test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Sample Route 2: /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Sample Route 3: /api/message
app.get('/api/message', (req, res) => {
  res.json({ message: 'Message from /api/message endpoint' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
