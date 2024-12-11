// import captainModel from "../models/captain.models";
import captainModel from "../models/captain.models.js";
import *as captainServices from "../services/captain.services.js";
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.models.js";


export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullName, email, password,vehicle } = req.body;
    const captainAlreadyExists = await captainModel.findOne({ email });
    if (captainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    console.log(req.body)
    
    const hashPassword = await captainModel.hashPassword(password);
    
    const captain = await captainServices.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword,
        vehicle
    });
    
    const token = await captain.generateAuthToken(captain);
    
    res.status(201).json({ captain, token });
    
    }

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    console.log(req.body)
    
    const captain = await captainModel.findOne({ email }).select('+password');
    
    if (!captain) {
        return res.status(400).json({ message: "Captain not found" });
    }
    
    const isMatch = await captain.comparePassword(password);
    
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = await captain.generateAuthToken(captain);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    
    res.status(200).json({ captain, token });
    
    }
export const getProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json({ captain });
    }

export const logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token|| req.headers.authorization?.split(" ")[1];
    await blacklistToken.create({ token });
    res.status(200).json({ message: "Captain logged out" });
    }