const User = require("../models/User");
const { verifyToken } = require("../service/auth");

function checkForAuthenticationCookie(cookieName) {
  return async (req, res, next) => {
    const token = req.cookies?.cookieName || req.cookies?.[cookieName];

   

    if (!token) {
      req.user = null;
      return next();
    }


    const payload = verifyToken(token);


    if (!payload) {
      req.user = null;
      return next();
    }

    const user = await User.findById(payload._id);

    req.user = user || null;

    next();
  };
}

module.exports = { checkForAuthenticationCookie };