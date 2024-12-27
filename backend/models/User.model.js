import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    gender : {
        type: String,
        required: true,
         
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    },
    lastLogin : {
        type : Date ,
        default: Date.now
    },
    isVerfied : {
        type: Boolean,
        default: false 
    },
    resetPasswordToken : String ,
    resetPasswordExpiresAt: Date , 
    verficationToken : String ,
    verficationTokenExpiresAt: Date ,
},{timestamps: true});


export const User = mongoose.model('User', UserModel);