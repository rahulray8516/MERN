const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 3001

const app = express()
app.use(bodyParser.json())
app.use(cors())

var ADMIN = []

app.get("/todo",(req,res) => {
    res.send(ADMIN)
})

app.post("/todo",(req,res) => {
    const body = req.body
    ADMIN.push(body)
    res.send(body)
})

app.delete("/todo/:id",(req,res) => {
    const id = (req.params.id)
    const admin = ADMIN.find( a => a.id === id )

    console.log(id)
    if(admin){
        const newA = []
        ADMIN.forEach(element => {
            if(element.id != id){
                newA.push(element)
            }
        });
        ADMIN = newA
        res.send(ADMIN)
    }else{
        res.json({
            n : "n"
        })
    } 
    console.log(ADMIN)
})

app.listen(port,() => {
    console.log("Server is Started on PORT",port)
})