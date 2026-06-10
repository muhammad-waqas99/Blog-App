const User = require('../models/User')


async function  getUser(req,res,next){

    

    const userId = req.user._id;

    const currentUser = await User.findById(userId)

     req.user=currentUser

    next()
}

module.exports= {getUser};