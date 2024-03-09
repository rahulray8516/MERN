const mongoose = require('mongoose')
var adminSchema = mongoose.Schema({

    isAdmin : {
        type : Boolean,
        required : true
    },
    username : {
        type: String,
        unique : true , 
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const Admin = mongoose.model('SellingCourseAdmin',adminSchema)
module.exports = Admin
