import { userModel } from "../models/user.models.js";
import * as userServices from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  console.log(req.body)

  const hashPassword = await userModel.hashPassword(password);


  const user = await userServices.createUser({
    firstName:fullName.firstName,
    lastName : fullName.lastName,
    email,
    password: hashPassword,
  });


const token = await user.generateAuthToken(user);

  res.status(201).json({ user, token });

};
