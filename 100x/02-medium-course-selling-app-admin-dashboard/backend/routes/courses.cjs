const express = require('express')
const router = express.Router()
const {authenticateJWT} = require('../auth/auth.cjs')
const courses = require('../model/courses.cjs') 
router.get('/courses',authenticateJWT,async(req,res)=>{
    console.log(req.headers)
    try{
        const allCourses = await courses.find({})
        res.send(allCourses)
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Error in Fetching Data",
            error : error.message
        })
    }
})
router.post('/createCourse',authenticateJWT, async (req, res) => {
    try {
        const courseRequestBody = req.body;
        const courseFinalBody = new courses({
            ...courseRequestBody
        }); // Directly pass the request body
        await courseFinalBody.save();
        console.log("Data Saved Successfully!");
        res.status(200).send(courseFinalBody);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in Saving Data", error: error.message });
    }
});

router.put('/updateCourse/:id',authenticateJWT, async (req, res)=>{
    try{
        var changes=[];
        const id = req.params.id;
        const updates = req.body;
        const existedCourse = await courses.findOne({courseID:id})
        if(!existedCourse){
            return res.status(404).send("No Course Found")
        }
        //Updating only those fields which are changed
        Object.keys(updates).forEach((key)=>{
                if(updates[key]!==null){
                    if(existedCourse[key]!==updates[key]){
                        changes.push({[key] : existedCourse[key]})
                        existedCourse[key]=updates[key];
                    }
                }
        })
        await existedCourse.save()
        if(changes.length===0){
            res.send({
                message : "No Change Detected"
            })
        }else{
            res.send({
                message : "Course Updated SuccessFully",
                changedKeys : changes,
                updatedBody : existedCourse
            })
        }
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Failed To Update",
            error : error.message
        })
    }
})

router.delete('/deleteCourse/:id',authenticateJWT,async (req,res)=>{
    try{
        const id = req.params.id;
        const deltedCourse = await courses.findOneAndDelete({courseID : id});
        if(!deltedCourse){
            console.log("No Such Course Exist")
            res.send({
                message : "No Such Course Exist"
            })
        }
        else{
            res.status(200).send({
                message : 'Deleted Successfully Course with ID : '+ id
            });
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Failed to delte Course with ID : " +  req.params.id,
            error : error.message
        })
    }
})

module.exports = router