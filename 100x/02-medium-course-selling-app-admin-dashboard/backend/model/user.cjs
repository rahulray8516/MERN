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

const Admin = mongoose.model('SellingCoursesUser',adminSchema)
module.exports = Admin
