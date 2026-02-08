const mongoose = require('mongoose');
const {createHmac,randomBytes} =require('crypto')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:true

},

  email:{
    type:String,
    required:true
  },

  salt:{
    type:String,
    
  },
  password:{
    type:String,
    required:true
  },

  userProfileImage:{
    type:String,
    default:"../public/images/Use"
  }

},{timestamps:true})

const User =mongoose.model("user", userSchema)

module.exports =User

userSchema.pre('save',function (next){
    const user =this;
    if(!user.isModified("password")) return;

    const salt =randomBytes(16).toString()
    const hashPassword =createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")

    this.salt =salt
    this.password=hashPassword

    next()

})