// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const noteRoutes = require('./routes/note-routes');
// const cors = require('cors');

// // Connect to MongoDB
// const mongoDbUri = process.env.MONGO_DB_URI;

// mongoose.connect(mongoDbUri)
//   .then(() => {
//     console.log('Successfully connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB', err);
//   });


// const app = express();
// // app.use(cors());

// const allowedOrigins = 
// [
//   'https://frontend-2dssykpow-relmelegys-projects.vercel.app', 
//   'https://frontend-git-main-relmelegys-projects.vercel.app',
//   'https://frontend-relmelegys-projects.vercel.app/',
// ];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
// app.use(express.json());
// app.use('/notes', noteRoutes);

// const port = process.env.PORT || 5001;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note-routes');
const cors = require('cors');

const mongoDbUri = process.env.MONGO_DB_URI;

mongoose.connect(mongoDbUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/notes', noteRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
