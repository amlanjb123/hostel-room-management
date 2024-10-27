const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./utils/database');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Import the error handler
const config = require('./config/config');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to the frontend URL
  credentials: true
}));


// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Example API route (adjust based on your backend logic)
app.get('/api/example', (req, res) => {
  res.json({ message: "API response here" });
});

// Route to serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware (use at the end of all routes)
app.use(errorHandler);

// Define port and start the server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);
