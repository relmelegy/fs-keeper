require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note-routes');
const cors = require('cors');

// Connect to MongoDB
const mongoDbUri = process.env.MONGO_DB_URI;

mongoose.connect(mongoDbUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const app = express();

// Updated CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://fs-keeper.vercel.app',
  'https://fs-keeper-relmelegys-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/notes', noteRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});