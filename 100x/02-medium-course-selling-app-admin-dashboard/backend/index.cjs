const express = require('express')
const cors = require('cors')
const  bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(cors)
app.use(bodyParser.json())


//mongoose Connection
const connectionString = "mongodb+srv://rahulray8518:rahulray85188101@cluster0.oveeh21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString)
mongoose.connection.on('connected', ()=> {
    console.log("mongoose Connected")
})
mongoose.connection.on('disconnected', ()=>{
    console.log("mongoose DisConnected")
})
mongoose.connection.on('error', (err)=> {
    console.log(`mongoose Error: ${err}`)
})





app.listen(3002,'100.93.3.137',() => {
    console.log(`Backend is running on PORT : 3002`)
})


