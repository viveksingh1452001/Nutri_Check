const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/dbConnect');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
dbConnect()
  .then(() => {
    // Start server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process on connection failure
  });
