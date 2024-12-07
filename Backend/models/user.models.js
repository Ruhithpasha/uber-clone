import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    fullName:{

        firstName:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleast of 3 characters']
        },
        
        lastName:{
            type:String,
            minlength:[3,'Last name must be atleast of 3 characters']
        }
     },
     email:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,'Email must be atleast of 3 characters']
     },
     password:{
        type:String,
        required:true,
        select:false

     },
     socketId:{
        type:String,
     },
})
//this below code is used to hash the password before saving it to the database and to generate a token for the user , everytime user logs in and id is generated for the user and stored in the database and the token is generated for the user 
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token
}


// this are the middleware functions that are used to compare the password that is stored in the database and the password that is entered by the user while logging in
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
//above code is easier to understand and is more readable
// userSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password,12);
//     }
//     next();
// })

export const userModel = mongoose.model('User',userSchema);