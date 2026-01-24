import mongoose from 'mongoose';

const userschema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const userModule=mongoose.model('kemon',userschema)

export default userModule