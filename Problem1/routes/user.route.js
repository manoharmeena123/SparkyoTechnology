

const express = require('express');
const userRouter = express.Router();
const {signup, login}= require('../controller/user.controller');


//Register user
userRouter.post('/sign',signup);

//Login user
userRouter.post('/login', login);


module.exports ={
    userRouter
}