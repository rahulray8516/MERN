const mongoose = require('mongoose')
var userSchema = mongoose.Schema({

    firstName: { type: String},
    lastName: { type: String},
    email : {type : String},
    userName : {
        type: String,
        unique : true , 
        required : true
    },
    password : {
        type : String,
        required : true
    },
    coursePurchased : {
        type : Array
    }
});

const USER = mongoose.model('SellingCoursesUser',userSchema)
module.exports = USER
