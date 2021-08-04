var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    short_description: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    fee: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    goal: {
        type: String,
        default: 0
    },
    requirement: {
        type: String,
        default: ''
    },
    course_picture_url: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: ''
    },
    skill_level: {
        type: String,
        default: ''
    },
    course_category_id: { type: Schema.Types.ObjectId, ref: 'CourseCategory' },
    instructor_id: { type: Schema.Types.ObjectId, ref: 'User' },
    message_to_instructor: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    }
});



var Course = mongoose.model('Course',CourseSchema);
module.exports = Course;   