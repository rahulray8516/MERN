const express = require('express')
const router = express.Router()
const { generateJWT , authenticateJWT} = require('../auth/auth.cjs');


router.post("/signup",async (req,res) => {
    try{
        const adminModel = require('../model/admin.cjs')
        const userExist = await adminModel.findOne({userName : req.body.userName})

        if(userExist){
            return res.status(409).send({
                message : "User Exist Mate , Back OFF!"
            })}
        const {firstName, lastName, email, userName, password } = req.body;
        const newAdmin = new adminModel({
        firstName:firstName, lastName:lastName, email:email, 
        userName : userName, password:password })
        await newAdmin.save()

        const token = generateJWT(newAdmin.userName)
        res.status(200).send({
            message : "Signed Up SuccessFully",
            token : token
        })
    }catch(error){
        console.log(error)
        res.send({
            message : "Error in saving SignUp Data",
            error : error.message
        })   
    }
})
router.post('/login',async (req,res) => {

    try{
        const adminModel = require('../model/admin.cjs')
        const {userName,password} = req.body;
        const adminExist = await adminModel.findOne({userName : userName})
        if(!adminExist){
            return res.status(401).json({
                message :"User Not Exist , Please Signup"
            })
        }
        const isValidPassword =  adminExist.password ===password
        if(!isValidPassword){
            return res.status(401).send({
                message : "Invaid Password"
            })
        }

        const token  = generateJWT(adminExist.userName)
        res.status(200).send({
            message : "Logged In Successfully",
            token : token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Login Failed",
            error : error.message
        })
    }
})
module.exports = router