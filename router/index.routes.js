import express from 'express'
import auth from '../middleware/auth.js'
import multer from 'multer'
import upload from '../config/multerConfig.js';




const router=express.Router();

router.get('/home',auth,(req,res)=>{
    console.log(req.user)
    res.render('home');
});

router.get('/upload',auth,(req,res)=>{
    res.render('upload');
});
router.post("/upload", auth,upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file
  });
});



export default router;