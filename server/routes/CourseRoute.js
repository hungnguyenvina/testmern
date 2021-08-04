var express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const middleware = require('../middlewares/middleware');

router.get('/all_courses',  middleware.checkAuthenticate(), CourseController.getAllCourses);

router.get('/instructor_courses', middleware.checkAuthenticate(), CourseController.getAllCoursesOfInstructor);

router.get('/curriculum/:id', CourseController.getCourseCurriculumByCourseID);

router.get('/:id',  CourseController.getCourseById);

router.put('/update_curriculum/:id',  middleware.checkAuthenticate(),middleware.isInstructor(), CourseController.updateCourseCurriculum);

router.put('/:id',  CourseController.updateBasicCourseInfo);

router.get('/',  CourseController.getCourses);

router.post('/', middleware.checkAuthenticate(), CourseController.createCourse);

router.put('/submit_course_for_approval/:id', middleware.checkAuthenticate(), CourseController.submitCourseForApproval);

router.put('/approve_reject_course/:id', middleware.checkAuthenticate(), CourseController.changeCourseStatus);

router.delete('/:id', middleware.checkAuthenticate(), CourseController.deleteCourse);

  

module.exports= router;