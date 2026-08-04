const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin requests from React frontend
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'Success',
    message: 'Welcome to HisabDo Internship Bootcamp - Day 1 Express.js Server!',
    timestamp: new Date().toISOString()
  });
});

// API status route
app.get('/api/status', (req, res) => {
  res.json({
    server: 'HisabDo Backend',
    status: 'Active',
    stack: ['Node.js', 'Express.js'],
    day: 1,
    uptime: process.uptime()
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 HisabDo Day 1 Server running on port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`===========================================`);
});
