import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";
import bcrypt from "bcrypt";
import blacklistToken from "../models/blacklistToken.models.js";
import captainModel from "../models/captain.models.js";


//this is the middleware function that is used to authenticate the user
export const authUser = async (req, res, next) => {
    //step 1 : get the token from the request header or from the cookies
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }
//check if the token is blacklisted
  const isBlackLIsted = await blacklistToken.findOne({token:token})
  if(isBlackLIsted){
    return res.status(401).json({message:"Not authorized to access this route"})
  }

  try {
    //step 2 : verify the token using the jwt.verify function
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //step 3 : find the user by id and store the user in the req object
    const user = await userModel.findById(decoded._id);
    req.user = user;
    //step 4 : call the next function to move to the next middleware
   return next();
  } catch {
    //step 5 : if the token is invalid then send the response as not authorized to access this route
    res.status(401).json({ message: "Not authorized to access this route" });
  }
};

export const authCaptain = async (req, res, next) => {  
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }

  const isBlackLIsted = await blacklistToken.findOne({token:token})
  if(isBlackLIsted){
    return res.status(401).json({message:"Not authorized to access this route"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  }
  catch {
    res.status(401).json({ message: "Not authorized to access this route" });
  }
}