import express from "express";
import{body,validationResult} from 'express-validator';
import userModule from "../model/data.js";

const router= express.Router()


router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/check',(req,res)=>{
    res.render('home');
})

router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register',
    body('username').trim().isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body('useremail').trim().isEmail().withMessage('Please enter a valid email address'),
    body('userpassword').trim().isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    async(req,res)=>{

    const errors= validationResult(req);

    if(errors.isEmpty()){
        return res.status(400).json({
            error: errors,
            message:'there is a error'
        })
    }

    else{
        const{username,useremail,userpassword}=req.body;
       const data= await userModule({
            name:username,
            email:useremail,
            password:userpassword
        })

        res.send('data received')
    }
});
export default router

