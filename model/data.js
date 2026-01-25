import mongoose from 'mongoose';

const userschema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:String
})

const userModule=mongoose.model('user',userschema)

export default userModule