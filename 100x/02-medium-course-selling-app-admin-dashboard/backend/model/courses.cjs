const mongoose = require('mongoose')
var coursesSchema = mongoose.Schema({
    courseID: {
        type: String
    },
    courseTitle: {
        type: String
    },
    courseDescription: {
        type: String
    },
    courseImage: {
        type: String
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
