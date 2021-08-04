var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var CourseCategorySchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 500,
      trim: true 
    },
    description: {
      type: String,
      trim: true 
    },
    course_category_parent_id: {
      type: Schema.Types.ObjectId,
      reference: 'nameofcoursecategorymodel'
    },
    status : {
      type: Number,
      default: 0
    }
});

module.exports = mongoose.model("CourseCategory",CourseCategorySchema);