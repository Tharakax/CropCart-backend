import express from 'express';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function saveUser(req,res){
    console.log(req.body.password);

    const hashedpassword = bcrypt.hashSync(req.body.password ,10);
    
    console.log(hashedpassword);
    const newUser = new UserModel({
        email : req.body.email,
        name : req.body.name,
        password : hashedpassword,

    })
    newUser.save().then(()=>{
            res.json({
                    message : "User saved"
            })
    }).catch(()=>{
        res.json({
            message : "error saving user"
        })
    })
}

export function getone(req,res){

   
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({
        email : email

        
    }).then((user)=>{
        if(user==null){
            res.json({
                message : "User not found"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync(password , user.password)
            
            if(isPasswordCorrect){
                const userdata = {
                    email : user.email,
                    name : user.name,
                    role : user.role
                }
                const token = jwt.sign(userdata , process.env.JWT_key) 
                res.json({
                    message : "loggin success",
                    token : token
                })
            }else{
                res.json({
                    message : "wrong password"

                })
            }
        }
    })

}