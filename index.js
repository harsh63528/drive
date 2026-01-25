// import files
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'node:path';
import UserModel from './model/data.js';
import connection from './config/config.js';
import router from './router/user.routes.js';
// variables
const app =express();
const __dirname= import.meta.dirname;
const PORT=3000;

// middleware
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.set('view engine','ejs');
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/user',router)

// rconection
connection()

// post

app.listen(PORT)
