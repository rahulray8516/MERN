This Text file contain all the Necessary Code snippet Related to MongoDB

## Code to Define a model

    const mongoose = require('mongoose')
    
    const todoSchema = mongoose.Schema({
        id : {
          type : String,
          required : true
        },
        title : {
          type : String,
        },
        description : {
          type : String,
        },
        isDone : {
          type : Boolean,
          default : false
        }
    })
    
    const todo = mongoose.model('todos',todoSchema)
    module.exports = todo

## Code to Connect to Mongoose

    const mongoose = require('mongoose')
    const connectionString = ""
    
    mongoose.connect(connectionString)
    mongoose.connection.on('connected',() => {
        console.log('Connected To mongoDB')
    })
    mongoose.connection.on('disconnected',() => {
      console.log('Disconected to Mongoose')
    })
    mongoose.connection.on('error', (err) => {
      console.log('Error Connecting to MongoDB',err)
    })

## code to get the data from DB

    const todoDataGet = require("../src/models/todomodel.cjs")
    app.get("/todo",async (req,res) => {
      try{
        const todoss = await todoDataGet.find()
        res.send(todoss)
      }catch(error){
          res.status(500).json({
            Message : "Unable To Fetch Todos Boss"
          })
      }
    })

## code to put the data coming from request body/header etc


    app.post("/todo",(req,res) => {
        const todoBody = req.body; 
        const todoBodyCreate = new todoDataGet({
          ...todoBody
        }) 
        todoBodyCreate.save().then((err)=>{
            console.log(err)
        })
        res.send(todoBody)
    })