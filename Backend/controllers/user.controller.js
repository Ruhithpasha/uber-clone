import { userModel } from "../models/user.models.js";
import * as userServices from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);


  const user = await userServices.createUser({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });


const token = await userModel.generateAuthToken(user);

  res.status(201).json({ user, token });

};
