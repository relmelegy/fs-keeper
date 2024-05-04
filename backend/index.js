const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});