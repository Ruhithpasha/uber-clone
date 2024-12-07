const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express')
const app = express()


app.use(cors());

//below code is for testing purpose this code is called a route
app.get('/',(req,res)=>{
    res.send("hello ruhith chuitya hai")
})

module.exports = app;