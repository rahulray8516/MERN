const express = require('express')
const cors = require('cors')
const  bodyParser = require('body-parser')
const app = express()
app.use(cors)
app.use(bodyParser.json())






app.listen(3002,'100.93.3.137',()=>{
    console.log(`Backend is running on PORT : 3002`)
})