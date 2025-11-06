const UserModel = require("../models/userModel");
const generateToken = require("../utils/GenerateToken");
const setCookies = require("../utils/SetCookies");

exports.register = async (req,res) => {
  try {
    const {fullName,userName,password, confirmPassword, gender} = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({message: "All fields is required"});
    }

    if (password !== confirmPassword) {
      return res.status(400).json({message: "Password do not match"})
    }

    const user = await UserModel.findOne({userName});

    if(user){
      return res.status(401).json({message: "User already exist, Please login."});
    }

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username:${userName}`
    const FemaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username:${userName}`

    await UserModel.create({
      fullName,
      userName,
      password,
      profilePhoto: gender === "male" ? maleProfilePhoto : FemaleProfilePhoto,
      gender
    });

    res.status(201).json({message: "User register successfully",})
  } catch (error) {
    res.status(500).json({message: "User not register",error: error.message})
  }
}

exports.login = async (req,res) => {
  try {
    const {userName,password} = req.body;
    const user = await UserModel.findOne({userName});

    if (!user) {
      return res.status(404).json({message: "User not found. Please register first."})
    }

    const isPasswordMatch = await user.isPasswordCompare(password);
    if (!isPasswordMatch) {
      return res.status(403).json({message: "Invalid credentials"})
    }

    const token = generateToken(user._id)
    setCookies(res,token)
    
    res.status(201).json({message: "login successfull",
      user: {
        userName: user.userName,
        userId: user._id
      }
    })
  } catch (error) {
    res.status(500).json({message: 'login failed',error: error.message})
  }
}

exports.getOtherUsers = async (req,res) => {
  try {
    const loggedInUserId = req.id; 
    const otherUsers = await UserModel.find({_id:{$ne:loggedInUserId}}).select("-password");
    return res.status(200).json(otherUsers)
  } catch (error) {
    console.log(error);
  }
}