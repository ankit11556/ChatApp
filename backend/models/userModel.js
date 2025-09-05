const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    enum: ["male","female"],
    required: true
  }
}, {timestamps: true})

userSchema.pre('save',async function(next){
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password,10);
    next();
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isPasswordCompare = async function (password) {
  try {
    return await bcrypt.compare(password,this.password)
  } catch (error) {
     throw new Error("password comparision failed");
  }
}

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel