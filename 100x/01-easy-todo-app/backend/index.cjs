const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3001
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(cors())
//Code to create Mongoose Here
const connectionString = "mongodb+srv://rahulray8518:rahulray85188101@cluster0.oveeh21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const deletedTodo = await todoDataGet.findOneAndDelete({ id: id });
      if (!deletedTodo) {
          res.status(404).json({
              message: "Todo not found"
          });
      } else {
          res.json({
              message: "Todo deleted",
              deleted: deletedTodo
          });
      }
  } catch (error) {
      res.status(500).json({
          message: "Error deleting todo"
      });
  }
});

app.listen(port,"100.93.3.137",() => {
    console.log("Server is Started on PORT",port)
})