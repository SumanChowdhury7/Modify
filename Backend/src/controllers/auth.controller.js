const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache')

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }
  const salt = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: salt,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Registered Sucessfully.",
    user: {
        id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
};

const loginController = async (req,res)=>{
const {username,email,password} = req.body
const user= await userModel.findOne({
    $or: [
{username:username},
{email:email}
    ]
}).select('+password');

if(!user){
    return res.status(404).json({
        message: "Invalid credential"
    })
}

const isPasswordMatch = await bcrypt.compare(password, user.password);

if(!isPasswordMatch){
    return res.status(400).json({
        message: "Invalid credential"
    })
}

const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie('token',token);

  res.status(200).json({
    message : "Logged in Successfully.",
    user:{
        id: user._id,
        username: user.username,
        email: user.email
        },
        token
  })

}

const getMeController = async (req,res)=>{

const id = req.user.id;

const user = await userModel.findById(id)

if(!user){
  return res.status(400).json({
    message: "Unauthorized"
  })
}

res.status(200).json({
  message: "Fetched successfully",
  user
})

}

const logoutController = async (req,res)=>{
const token = req.cookies.token;

if(!token){
  return res.status(401).json({
    message: "Token not found"
  })
}

res.clearCookie("token")

redis.set(token, Date.now().toString(),"EX", 60*60)
res.status(200).json({
  message: "Logout Successfully."
})

}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController
};
