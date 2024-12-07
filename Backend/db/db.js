// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// import { DB_Name } from '../constants.js'; old way of importing now not valid

import { DB_Name } from '../utils/constants.js';

// function connectDB(){
//     mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
//         console.log("Connected to DB");
//     }).catch((err)=>{
//         console.log(err);
//     })
// }

const connectDB = async ()=>{

    try{
        const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);

        console.log(`Connected to DB ${connectionInstance.connection.host}`);
    }catch(err){
        console.log("Error aya hai",err);
        process.exit(1);
    }
}

// module.exports = connectDB;

export default connectDB;   