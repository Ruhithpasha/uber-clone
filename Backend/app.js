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
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js';


connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//below code is for testing purpose this code is called a route
app.get('/',(req,res)=>{
    res.send("hello ruhith ")
})

app.use('/api/users',userRoutes)
app.use('/api/captains',captainRoutes)



export default app;