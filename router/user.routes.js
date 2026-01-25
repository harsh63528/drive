import express from "express";
import{body,validationResult} from 'express-validator';
import userModule from "../model/data.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

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

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors,
            message:'there is a error'
        })
    }

    else{
        const{username,useremail,userpassword}=req.body;
        const hachPassword= await bcrypt.hash(userpassword,10)
        const data=await userModule.create({
            name:username,
            email:useremail,
            password:hachPassword
        })

        console.log(data)
        res.send('registered')
    }
});

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
     body('username').trim().isLength({min:3}).withMessage('password or username is wrong'),
     body('password').trim().isLength({min:6}).withMessage('Password or username is wrong'),
    async (req,res)=>{
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.send(error)
        }
        else{
             const{username,password}=req.body  

            const result= await userModule.findOne({
                    name:username
                })

                if(!result){
                   return res.status(400).send('user or password is wrong')
                }

                 const passwordconfirm=  await bcrypt.compare(password,result.password)

                 if(!passwordconfirm){
                    return res.status(400).send('user or password is wrong')
                 }

                 const token=jwt.sign(
                    {id:result._id},
                    process.env.JWT_SECRET,
                    {
                        expiresIn:process.env.JWT_EXPIRE
                    }
                 )

                 res.cookie('token',token)
                 res.send('logged in succesfully')
                
                


            }
        }
)
export default router

