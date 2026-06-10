const mongoose = require('mongoose');
const {createHmac,randomBytes} =require('crypto');
const { generateToken } = require('../service/auth');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:[true, "Name is Required"],
    minlength:[3, "Name must be atleast three character long"]

},

  email:{
    type:String,
    required:[true,"Email is Required"],
    unique:true,
    validate:[validator.isEmail, "Enter a Valid Email Address" ]
  },

  salt:{
    type:String,
    
  },
  password:{
    type:String,
    required:[true, "Password is Required"],
    minlength:[8, "Password must be atleat 8 character long"],

  
  },

  role:{
    type:String,
    enum:["user" , "admin"],
    default:"user"
  },

  userProfileImage:{
    type:String,
    default:"/images/profileImage.png"
  }

},{timestamps:true})




userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.statics.comparePasswordAndAuthentication = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const userProvidedHash =await  createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== user.password) {
    throw new Error("Invalid password");
  }

  const token =generateToken(user)



  return token;
};
const User =mongoose.model("user", userSchema)

module.exports =User; 