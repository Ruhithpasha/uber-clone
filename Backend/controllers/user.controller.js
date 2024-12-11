import { userModel } from "../models/user.models.js";
import * as userServices from "../services/user.services.js";
import { validationResult } from "express-validator";
import blackLIstTokenModel from "../models/blacklistToken.models.js";
//below code is for registering the user
export const registerUser = async (req, res, next) => {

  //step 1 : check errors 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
// step 2: get the data from the request body and store into fullName,email,password
  const { fullName, email, password } = req.body;

  console.log(req.body)
// step 3: hash the password using the hashPassword function from userModel
  const hashPassword = await userModel.hashPassword(password);

// step 4: create a new user using the createUser function from userServices
  const user = await userServices.createUser({
    firstName:fullName.firstName,
    lastName : fullName.lastName,
    email,
    password: hashPassword,
  });

// step 5 : generate a token for the user using the generateAuthToken function from userModel
const token = await user.generateAuthToken(user);

  res.status(201).json({ user, token });

};

//below code is for login user
export const loginUser = async (req,res,next) => {
  

  //step 1 : check errors
const errors = validationResult(req);

if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()});
}
// step2 : get the data from the request body and store into email,password
const {email,password}=req.body;
console.log(req.body)
// step 3: find the user by email and select the password
const user = await userModel.findOne({email}).select('+password');

if(!user){
  return res.status(401).json({message:"Invalid Credentials"})
}
//step4 : compare the password entered by the user and the password stored in the database
const isMatch  = await user.comparePassword(password);

if(!isMatch){
  return res.status(401).json({message:"invalid Credentials"})
}
//step5 : generate a token for the user using the generateAuthToken function from userModel
const token = await user.generateAuthToken();
//step 6 : send the response with the user and the token
// setting the token in the cookie
res.cookie('token',token,{
  httpOnly:true,
  secure:true,
  sameSite:'none'
})

return res.status(200).json({user,token});

}
//below code is for getting the user profile
export const getUserProfile = async (req,res,next) => {
  res.status(200).json({user:req.user});
}
//below code is for logging out the user
export const logoutUser = async (req,res,next) => {
  // clearing the cookies
// the token passes as parameter in clearCookie funtion has been created in login user function
  res.clearCookie('token');
  // step 1 : get the token from the request header or from the cookies
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
// step 2 : create a new blacklisted token using the create function from blackLIstTokenModel
  await blackLIstTokenModel.create({token});
  res.status(200).json({message:"Logged out successfully"});

}

