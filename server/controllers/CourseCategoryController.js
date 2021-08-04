const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const CourseCategoryModel = require('../models/CourseCategory');
exports.getCourseCategories = function(req, res){
    //do nothing here at this time
    CourseCategoryModel.find({})
    .populate({ path: 'course_category_parent_id', select: 'name' })
    .exec(function(err, results){
      let newResults= results.map(item => {
        return {
          _id: item.id,
          name: item.name,
          description: item.description,
          course_category_parent_id: item.course_category_parent_id==null?'': item.course_category_parent_id._id,
          course_category_parent_name: item.course_category_parent_id==null?'':item.course_category_parent_id.name,
          status: item.status
        }
      })
      res.json(newResults);
    })
  }

exports.createCourseCategory = function(req, res){
    //do nothing here at this time
    
    var courseCategoryID = mongoose.Types.ObjectId();
    let createCourseCateogry = {  ...req.body  }
    if(req.body.course_category_parent_id == "" || req.body.course_category_parent_id == "0"){
      createCourseCateogry = {
        ...createCourseCateogry,
        course_category_parent_id: courseCategoryID
      }
    }
    console.log('createCourseCateogry object in createCourseCategory api....');
    console.log(createCourseCateogry);
    var courseCategory = new CourseCategoryModel(createCourseCateogry);
    courseCategory.save(function(err, result){
      if(err) {
        console.log(err);
        res.json({err: err});
      }
      res.json(result);
    })
  }

exports.updateCourseCategory = function(req, res){
    //do nothing here at this time
    let data = req.body;
    console.log('req.params'+req.params);
    console.log(req.params);

    var courseCategoryID = mongoose.Types.ObjectId();
    let updateCourseCateogry = {  ...req.body  }
    if(req.body.course_category_parent_id == "" || req.body.course_category_parent_id == "0" || req.body.course_category_parent_id == "1"){
      updateCourseCateogry = {
        ...updateCourseCateogry,
        course_category_parent_id: courseCategoryID
      }
    }

    console.log('updateCourseCateogry');
    console.log(updateCourseCateogry);
    CourseCategoryModel.findOneAndUpdate({
      _id: req.params.id},
      updateCourseCateogry,
      {new : true}
    )
    .populate({ path: 'course_category_parent_id', select: 'name' })
    .exec(function(err, result){
     console.log(result);
        let updatedCourseCategory= {
          _id: result._id,
          name: result.name,
          description: result.description,
          course_category_parent_id: result.course_category_parent_id==null?'': result.course_category_parent_id._id,
          course_category_parent_name: result.course_category_parent_id==null?'':result.course_category_parent_id.name,
          status: result.status
        }
      
      res.json(updatedCourseCategory);
    })
  }

  exports.deleteCourseCategory = function(req, res){
    //do nothing here at this time
    CourseCategoryModel.findOneAndRemove({_id: req.params.id}, function(err, result){
      if(err)  res.json({err:err});
      if(result=== null) {
        res.json({message:'this course category is not exist in database'});
      }
      else{
        res.json({message:'This course category has been successfully deleted!'});
      }
    })
  }