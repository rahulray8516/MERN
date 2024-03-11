const express = require('express')
const router = express.Router()

router.post("/signup",async (req,res) => {
    try{
        const adminModel = require('../model/admin.cjs')
        const userExist = adminModel.findOne(req.body.userName)
        if(userExist){
            return res.status(500).send({
                message : "User Exist Mate , Back OFF!"
            })
        }
        const { firstName, lastName, email, userName, password } = req.body;
        const newAdmin = new adminModel({
        firstName, lastName, email, userName, password })
        await newAdmin.save()
    }catch(error){
        console.log("Error in Saving SignUp Data")
        res.status(500).send({
            message : "Error in saving SignUp Data",
            error : error
        })   
    }
})
router.post('/login',(req,res) => {
})

module.exports = router