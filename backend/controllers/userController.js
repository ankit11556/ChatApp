const UserModel = require("../models/userModel");

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