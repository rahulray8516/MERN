const mongoose = require('mongoose')
var userSchema = mongoose.Schema({

    username : {
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
