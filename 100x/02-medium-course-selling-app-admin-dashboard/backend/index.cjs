const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3001
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(cors())
//mongoose Connection
const connectionStringLocal = "mongodb://localhost:27017/"
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

//Routes
app.use('/courses',require('./routes/courses.cjs'));
app.use('/admin',require('./routes/adminLogin.cjs'))
app.listen(port,"100.93.3.137",() => {
    console.log(`Backend is running on PORT : ${port}`)
})

