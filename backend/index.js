const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const noteRoutes = require('./routes/note-routes');

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true });

app.use(cors());
app.use(express.json());

app.use('/notes', noteRoutes);

app.get('/',(req,res)=>{
    res.json({message:'API works!'});
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

module.exports = app;