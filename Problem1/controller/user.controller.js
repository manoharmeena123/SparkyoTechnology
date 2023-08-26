const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const userRouter = express.Router();
const cookieparser = require("cookie-parser");
userRouter.use(cookieparser());
const { UserModel } = require("../models/user.model");


//signup=================================================================>
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(409).json({ msg: "User already exists. Please login." });
      }
  
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ msg: "Error in hashing password" });
        }
  
        try {
          const newUser = new UserModel({ email, password: hash });
          await newUser.save();
  
          res.status(200).json({ msg: "User Signup Successfully" });
        } catch (saveError) {
          console.error('Error saving user:', saveError);
          res.status(500).json({ msg: "Error in saving user" });
        }
      });
    } catch (error) {
      console.error('Error checking user existence:', error);
      res.status(500).json({ msg: "Error in Signup" });
    }
  };
  

//Login====================================================================>

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "Error in comparing passwords" });
                }

                if (result) {
                    const token = jwt.sign({ userId: user._id }, "masai", {
                        expiresIn: "5h",
                    });

                    res.cookie("token", token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 }); // Set maxAge in milliseconds (5 hours)

                    res.json({
                        msg: "Login Successfully",
                        token: token,
                    });
                } else {
                    res.json({ msg: "Login Failed" });
                }
            });
        } else {
            res.json({ msg: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Login failed Error in try" });
    }
}

module.exports = {
    signup,
    login
};