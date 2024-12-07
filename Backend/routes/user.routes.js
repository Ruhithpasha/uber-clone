
import express from 'express';
import {body} from 'express-validator';
const router = express.Router();
import *as  userController from '../controllers/user.controller.js';


// validation rules for register route of user
router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')   
],
// logic for register route of user which is written in user.controller.js can be accessed here by userController.registerUser
  userController.registerUser
)


router.post('/login',[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
userController.loginUser
)





export default router;