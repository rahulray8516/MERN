const mongoose = require('mongoose')
var coursesSchema = mongoose.Schema({
    courseID: {
        type: String,
        unique : false,
        required : true
    },
    courseTitle: {
        type: String,
        required : true
    },
    courseDescription: {
        type: String,
        required : true
    },
    courseImage: {
        type: String,
        default : "https://cdn5.vectorstock.com/i/1000x1000/30/59/online-course-vector-27123059.jpg",
    },
    coursePrice: {
        type: Number,
        default: 0.00,
        required: true
    },
    isPostedby: {
        type: String
    },
    isPurchasedBy: {
        type: String
    }
});

const Courses = mongoose.model('Courses', coursesSchema)
module.exports = Courses
