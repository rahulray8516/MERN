const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3001
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(cors())


//mongoose Connection
const connectionString = "mongodb+srv://rahulray8518:rahulray85188101@cluster0.oveeh21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString)
mongoose.connection.on('connected', () => {
    console.log("mongoose Connected")
})
mongoose.connection.on('disconnected', () => {
    console.log("mongoose DisConnected")
})
mongoose.connection.on('error', (err)=> {
    console.log(`mongoose Error: ${err}`)
})

app.get('/courses',async(req,res)=>{

    try{
        const allCourses= await courses.find({})
        res.send(allCourses)
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Error in Fetching Data",
            error : error.message
        })
    }
})
app.post('/createCourse', async (req, res) => {
    try {
        const courseRequestBody = req.body;
        const courseFinalBody = new courses({
            ...courseRequestBody
        }); // Directly pass the request body
        await courseFinalBody.save();
        console.log("Data Saved Successfully!");
        res.status(201).send(courseFinalBody);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in Saving Data", error: error.message });
    }
});

app.put('/updateCourse/:id', async (req, res)=>{
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

app.delete('/deleteCourse/:id',async (req,res)=>{
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
app.listen(port,"100.93.3.137",() => {
    console.log(`Backend is running on PORT : ${port}`)
})

