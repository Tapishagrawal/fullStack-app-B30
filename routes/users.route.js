const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require('../models/users.model');

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
    const {username, email,pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            res.status(200).send({"msg":"Use different email address"})
        }else{
            bcrypt.hash(pass, 3, async(err,hash)=>{
                if(err){
                    res.status(400).send({"msg":"Error in encrypting password."})
                }else{
                    const newUser = new UserModel({
                        username,
                        email,
                        pass:hash
                    })
                    await newUser.save();
                    res.status(200).send({"msg":"New user has been created.", "new User":newUser})
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "error": error })
    }
});

usersRouter.post("/login", async (req, res) => {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if (result){
                    const token = jwt.sign({userID: user._id, username:user.username}, "random");
                    res.status(200).send({"msg":"Login successful", "token":token});
                }else{
                    res.status(200).send({"msg":"Wrong Password"})
                }
            })
        }else{
            res.status(200).send({"msg":"user Email is invalid"})
        }
    } catch (error) {
        res.status(400).send({ "error": error })
    }
});

module.exports = { usersRouter }