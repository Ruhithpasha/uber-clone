
import express from "express";
import { body } from "express-validator";
const router = express.Router();
import * as captainController from "../controllers/captain.controllers.js";
import { authCaptain } from "../middlewares/auth.middlewares.js";

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.colour').isLength({min:3}).withMessage('Colour must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Vehicle type must be car or bike or auto')
],
  captainController.registerCaptain
)

router.post('/login',[

    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
  captainController.loginCaptain
)

router.get('/profile',authCaptain,captainController.getProfile)

router.get('/logout',authCaptain,captainController.logoutCaptain)

export default router;