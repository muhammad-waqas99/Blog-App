const jwt =require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


function generateToken(user) {
  const payload = {
    _id: user._id,
    
    
  };
 
   const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
  });


    return token;

}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }

}

module.exports = {
  generateToken,
  verifyToken,
};