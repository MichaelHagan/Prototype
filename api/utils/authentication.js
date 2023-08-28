require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.status(401).json("Unauthorized");

  if(!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)){
    return res.status(403).json("Forbidden");
  }

  let payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  req.payload = payload;
  next();
}

module.exports = {authenticate};