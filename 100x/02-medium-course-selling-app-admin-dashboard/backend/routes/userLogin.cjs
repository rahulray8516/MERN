const generateJWT = (user) => {
    const payload = user
    console.log("Payload is : ", payload)
    return jwt.sign(payload,secretKey,options)
}

const authenticateJWT = (req,res,next) => {
    const auth = req.headers.authorization
    
    if(auth){
        const token = auth.split(' ')[1]
        jwt.verify(token,secretKey,(err,user) => {
            if(err){
                console.log("Error Occurred at verify token Stage")
                return res.status(403).json({
                    message : "Sorry Token Extraction Issue"
                })
            }
            req.user = user
            next()
        });
    }else{
        res.status(401).json({
            message : "auth header is wrong , please check"
        })
    }
}