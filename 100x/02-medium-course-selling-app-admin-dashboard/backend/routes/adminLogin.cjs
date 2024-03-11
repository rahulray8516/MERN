const express = require('express')
const router = express.Router()
const { generateJWT , authenticateJWT} = require('../auth/auth.cjs');


router.post("/signup",async (req,res) => {
    try{
        const adminModel = require('../model/admin.cjs')
        const userExist = await adminModel.findOne({userName : req.body.userName})

        // if(userExist){
        //     return res.status(409).send({
        //         message : "User Exist Mate , Back OFF!"
        //     })}
        const {firstName, lastName, email, userName, password } = req.body;
        const newAdmin = new adminModel({
        firstName:firstName, lastName:lastName, email:email, 
        userName : userName, password:password })
        await newAdmin.save()

        const token = generateJWT({newAdmin})
        console.log(token)
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
router.post('/login',(req,res) => {
})

module.exports = router