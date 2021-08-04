var express = require('express');
const router = express.Router();
const CourseCategoryController = require('../controllers/CourseCategoryController');

router.get('/', CourseCategoryController.getCourseCategories);
  
router.post('/', CourseCategoryController.createCourseCategory);
  
router.put('/:id', CourseCategoryController.updateCourseCategory);
  
router.delete('/:id', CourseCategoryController.deleteCourseCategory);

module.exports= router;