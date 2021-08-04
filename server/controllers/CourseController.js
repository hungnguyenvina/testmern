const Course = require('../models/Course');
const CourseModel = require('../models/Course');
const LessionModel = require('../models/Lession');
const SectionModel = require('../models/Section');
const mongoose = require('mongoose');

exports.changeCourseStatus = async function(req,res) {
    const form ={ 
        message_to_instructor: req.body.messageToInstructor,
        status : req.body.status };
    const courseUpdated = await Course.findOneAndUpdate(
        {_id : req.params.id},form, {new : true}
    )
    .exec();

    
    console.log(courseUpdated);

    Course.find({})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.status(200).json(newResult);
        });
}

exports.submitCourseForApproval = async function(req,res) {
    const form ={ 
        status : req.body.status };
    const courseUpdated = await Course.findOneAndUpdate(
        {_id : req.params.id},form, {new : true}
    )
    .exec();

    console.log(courseUpdated);

    Course.find({instructor_id: req.user._id})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
}


exports.deleteCourse = function(req,res){
    Course.findOneAndRemove({_id : req.params.id},function(err,course){
       if(err) {
            res.json({status: 'failure', message:'cannot delete course!'+req.params.id});
        } else {
            res.json({status: 'success', message:'delete course successfully!'+req.params.id});
        }
    });
}

exports.getAllCoursesOfInstructor = function(req,res) {
    
    Course.find({instructor_id: req.user._id})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
}

exports.createCourse = function(req,res) {
    console.log(req.body);
    if(req.body.course_category_id === "-1") {
        delete req.body.course_category_id
    }
    console.log(req.body);

    let course = new CourseModel(req.body);
    course.instructor_id = req.user._id;
    course.save(function(err,result){
        if(err) return res.json({success: false, error: err});
        res.json({success: true, course: result});
    })
}

exports.getCourses = function(req,res){
    let courses = req.query.id;
    let type = req.query.type;
    if(type==="array") {
        let courseIDs = courses.split(',');
        console.log(courseIDs);
        courses = courseIDs.map(item => {
            return mongoose.Types.ObjectId(item)
        });
    }
    else{
        courses = mongoose.Types.ObjectId(req.query.id);
    }
    console.log('getCourses................................'+courses);
    Course.find({_id: {$in: courses}})
        .populate({path : 'course_category_id', populate : {path : 'course_category_parent_id', select: ''}})
        .populate({path : 'instructor_id', populate : {path : 'user_id', select: 'name email'}})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view courses',error: err});
            let newResult = results.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    short_description: item.short_description,
                    goal: item.goal,
                    description: item.description,
                    requirement: item.requirement,
                    course_picture_url: item.course_picture_url,
                    fee: item.fee,
                    duration: item.duration,
                    skill_level: item.skill_level,
                    language: item.language,
                    course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                    course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                    course_category_parent_id: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id),
                    course_category_parent_name: item.course_category_id==null?'':(item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name),
                    instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                    instructor_name: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.name),
                    instructor_email: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id.email),
                    instructor_certificates: item.instructor_id==null?'':item.instructor_id.certificates,
                    instructor_teaching_area: item.instructor_id==null?'':item.instructor_id.teaching_area,
                    instructor_biography: item.instructor_id==null?'':item.instructor_id.biography,
                    instructor_avatar_url: item.instructor_id==null?'':item.instructor_id.avatar_url,
                    instructor_user_id: item.instructor_id==null?'':(item.instructor_id.user_id==null?'':item.instructor_id.user_id._id),
                    message_to_instructor: item.message_to_instructor,
                    status: item.status
                } 
            });
            res.json(newResult);
        });
}

exports.getAllCourses = function(req,res) {
    CourseModel.find({})
    .populate({path: 'course_category_id', populate: { path: 'course_category_parent_id', select: 'name' }})
    .populate({path: 'instructor_id', select : 'name email'})
    .exec(function(err, results){
        let newResults = results.map(item => {
            return {
                id: item._id,
                title: item.title,
                short_description: item.short_description,
                description: item.description,
                fee: item.fee,
                duration: item.duration,
                goal: item.goal,
                requirement: item.requirement,
                language: item.language,
                skill_level: item.skill_level,
                course_picture_url: item.course_picture_url,
                course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                course_category_parent_id: item.course_category_id==null?'':item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id,
                course_category_parent_name: item.course_category_id==null?'':item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name,
                instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                instructor_name: item.instructor_id==null?'':item.instructor_id.name,
                instructor_email: item.instructor_id==null?'':item.instructor_id.email,
                status: item.status,
                message_to_instructor: item.message_to_instructor
            }
        });

        res.json(newResults);
    })
}

exports.updateCourseCurriculum = function(req,res){
    console.log('/course/update_curriculum/........'+ req.params.id);
    console.log(req.body.sections);
    const sections = req.body.sections;
    const course_id = req.params.id;
    let ok=true;
    let message="Update course curriculum successfully!";

    for (var i = 0 ; i < sections.length; i++) {

        LessionModel.find({
          //  section_id: sections[i].section_id
          course_id: course_id
        })
        .remove()
        .exec(function (errRemoveLession, resultRemoveLessions) {
            if (errRemoveLession) 
                console.log(errRemoveLession);
                //return res.status(500).json({message:'cannot delete lessions',error: errRemoveLession});
            SectionModel.find({
                course_id: course_id
            })
            .remove()
            .exec(function (errRemoveSection, resultRemoveSections) {
                if (errRemoveSection) 
                    console.log(errRemoveSection);
                    //return res.status(500).json({message:'cannot delete sections',error: errRemoveSection});
            });
        });
    }

    let me=this;
    setTimeout(function(){
        for (var i = 0 ; i < sections.length; i++) {
            const sectionForSave = {
                name : sections[i].section_title,
                description: '',
                course_id: course_id,
                status: 0
            }
    
            const lessions = sections[i].lessions;
            //console.log('lesionsx.................');
            //console.log(lessions);
            var section = new SectionModel(sectionForSave);
    
            section.save(function(err,result){
                if(err) {
                    ok=false;
                    message= 'cannot add section'+err;
                    console.error(message);
                    //res.status(500).json({message:'cannot add section',error: err});
                } else {
                    //res.json(lessions[0]['name']);
                    //console.error(result);
                    const sectionID =result._id;
                    for (var i = 0 ; i < lessions.length; i++) {
                        const lessionForSave = {
                            name: lessions[i].name,
                            content: lessions[i].content,
                            type: 0,//lessions[i].lession_type,
                            section_id: sectionID,
                            course_id: course_id
                        }
    
                        //console.log('lessionForSave');
                        //console.log(lessionForSave);
                        var lession = new LessionModel(lessionForSave);
            
                        lession.save(function(err,lessionResult){
                            if(err) {
                                ok=false;
                                message= 'cannot add lession'+err;
                                //res.status(500).json({message:'cannot add lession',error: err});
                            } else {
                                //res.json(lessionResult);
                            }
                        });
                    }
                }
            });
        }//for
    },5000);
    

    setTimeout(function(){
        //console.log('okd');
        //console.log(ok);
        if(ok) {
            //console.log('fffffffffffffffokd');
            let result = LessionModel.find({'course_id': req.params.id})
            .select('name description content title type section_id')
            .populate({path : 'section_id',  select: 'name'})
            .exec(function (err, results) {
                if (err) return res.status(500).json({message:'cannot view course categories',error: err});
                /*let newResult = results.map((item) => {
                    return {
                        section_id: item.section_id._id,
                        section_title: item.section_id.name,
                        section_description: item.section_id.description,
                        lession_id: item._id,
                        lession_title: item.name,
                        lession_content: item.content,
                        lession_type: item.type
                    } 
                });

                console.log('newResult');
                console.log(newResult);*/
                res.json({
                    success: true,
                    message:message,
                    curriculum: results
                });
                //res.json(results);
            });
    
        }
        else {
            console.log('else');
            res.status(404).json({success: false,message:message});
        }
    },10000);

    
}

exports.getCourseCurriculumByCourseID = function(req,res){
    console.log(req.params.id);
    let result = LessionModel.find({'course_id': req.params.id})
        .select('name description content section_id type free_preview status')
        .populate({path : 'section_id',  select: 'name'})
        .exec(function (err, results) {
            if (err) return res.status(500).json({message:'cannot view course curriculum',error: err});
            let newResult = results.map((item) => {
                return {
                    _id: item._id,
                    title: item.section_id===null?'':item.section_id.name,
                    description: item.section_id===null?'':item.section_id.description,
                    lessions: results 
                } 
            });
            //res.json(results);
            res.json({
                success: true,
                message:'Get courses successfully!',
                curriculum: results
            });
        });       
}

exports.updateBasicCourseInfo = function(req,res) {
    let form = req.body;
    Course.findOneAndUpdate(
        { _id : req.params.id},
        form
    )
    .exec(function(err,courseResult){
        if(err) return res.status(400).json(
            {
                success: false,
                course:null, 
                message:'Cannot update course info '+err
            }
        );
        return res.status(200).json(
            {
                success: true, 
                course:courseResult, 
                message:'Update course successfully!'
            }
        );
    });
}

exports.getCourseById = function(req,res) {
    CourseModel.find({_id: req.params.id})
    .populate({path: 'course_category_id', populate: { path: 'course_category_parent_id', select: 'name' }})
    .populate({path: 'instructor_id', select : 'name email'})
    .exec(function(err, results){
        let newResults = results.map(item => {
            return {
                id: item._id,
                title: item.title,
                short_description: item.short_description,
                description: item.description,
                fee: item.fee,
                duration: item.duration,
                goal: item.goal,
                requirement: item.requirement,
                language: item.language,
                skill_level: item.skill_level,
                course_picture_url: item.course_picture_url,
                course_category_id: item.course_category_id==null?'':item.course_category_id._id,
                course_category_name: item.course_category_id==null?'':item.course_category_id.name,
                course_category_parent_id: item.course_category_id==null?'':item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id._id,
                course_category_parent_name: item.course_category_id==null?'':item.course_category_id.course_category_parent_id==null?'':item.course_category_id.course_category_parent_id.name,
                instructor_id: item.instructor_id==null?'':item.instructor_id._id,
                instructor_name: item.instructor_id==null?'':item.instructor_id.name,
                instructor_email: item.instructor_id==null?'':item.instructor_id.email,
                status: item.status,
                message_to_instructor: item.message_to_instructor
            }
        });

        res.json(newResults);
    })
}


