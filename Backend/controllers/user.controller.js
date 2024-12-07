import { userModel } from "../models/user.models.js";
import * as userServices from "../services/user.services.js";
import { validationResult } from "express-validator";
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

return res.status(200).json({user,token});

}

