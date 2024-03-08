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
      type : String,
      default : "false"
    }
})

const todo = mongoose.model('todos',todoSchema)
module.exports = todo
