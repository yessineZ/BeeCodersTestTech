import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { logout, signUp , verifyCode , getMe, signIn, forgetPasswordAuth , resetPassword } from '../controllers/auth.Controller.js';
const router = express.Router() ; 

router.post('/signUp',signUp);
router.post('/verify-code',checkAuth,verifyCode)  ;
router.post('/logout',logout) ; 
router.get('/getMe',checkAuth,getMe) ; 
router.post('/signIn',signIn) ; 
router.post('/forget-password',forgetPasswordAuth) ; 
router.post('/resetPassword/:token',resetPassword) ; 


export default router ;
