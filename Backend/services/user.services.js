import { userModel } from "../models/user.models.js";

// creating a new user
export const createUser = async ({firstName,lastName,email,password})=>{
    if(!firstName || !email || !password){
        throw new Error("Please provide all the required fields");
        
    }
    const user = userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })
     return user;
}

// export const userServices = {
//     createUser
// }

// export {createUser};