// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
// const express = require('express')
// const app = express()

// const connectDB = require('./db');


import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';    
import express from 'express';
const app = express();

import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//below code is for testing purpose this code is called a route
app.get('/',(req,res)=>{
    res.send("hello ruhith chuitya hai")
})

app.use('/api/users',userRoutes)



export default app;