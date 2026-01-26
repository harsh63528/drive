import express from 'express'
import auth from './middleware/auth.js'

const router=express.Router();

router.get('/home',auth,(req,res)=>{
    res.render('home');
});



export default router;