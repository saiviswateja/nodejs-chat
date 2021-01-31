const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const {isEmail} = require('validator');
const e = require('express');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Pleaser enter a name']
    },
    email:{
        type:String,
        required:[true,'Please enter the email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please enter a vallid email address"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minlength:[6,"The password should be atleast 6 characters ling"]
    }
},{timestamps:true});

UserSchema.pre('save',async function(next){
    const salt = await bcyrpt.genSalt();
    this.password = await bcyrpt.hash(this.password,salt);
    next();
});

UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const isAuthenticated = await bcyrpt.compare(password,user.password);
        if(isAuthenticated){
            return user;
        }
        else{
            throw new Error('Incorrect pwd');
        }
    }
    else{
        throw Error('incorrect email');
    }
}

const User = mongoose.model('user',UserSchema);
module.exports = User;

