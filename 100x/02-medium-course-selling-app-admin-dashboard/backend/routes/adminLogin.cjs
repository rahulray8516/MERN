var jwt = require('jsonwebtoken')

var secretKey = "sec3t"
var options = {
    expiresIn : '1h'
}
const generateJWT = (user) => {
    const payload = user
    return jwt.sign(payload,secretKey,options)
}

const authenticateJWT = (req,res,next) => {
    
}
