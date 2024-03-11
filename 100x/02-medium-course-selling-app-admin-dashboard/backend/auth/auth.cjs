var jwt = require('jsonwebtoken')

var secretKey = "Sec3et"
var options = {
    expiresIn : '1h'
}
const generateJWT = (user) => {
    const payload = user
    return jwt.sign(payload,secretKey,options)
}

const authenticateJWT = (req,res,next) => {
    const auth = req.headers.authorization;
    if(auth){
        const token = auth.split(' ')[1]
        jwt.verify(token,secretKey,(error,user)=>{
            if(error){
                res.status(500).send({
                    message : 'Sorry Token Extraction Issue Coming'
                })
            }
            req.user = user
            next()
        });
    }else{
        res.status(500).send({
            message : "Auth Header is wrong Please Check"
        })
    }
}
module.exports = {generateJWT,authenticateJWT}