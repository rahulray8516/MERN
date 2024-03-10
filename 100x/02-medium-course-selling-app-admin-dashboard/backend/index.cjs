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

const courses = require('./model/courses.cjs')

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
        const id = req.params.id;
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            message : "Failed To Update",
            error : error.message
        })
    }
})

app.listen(port,"100.93.3.137",() => {
    console.log(`Backend is running on PORT : ${port}`)
})

