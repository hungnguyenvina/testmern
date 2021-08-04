var express = require('express');
var router = express.Router();
const middleware = require('../middlewares/middleware');
const cartController = require('../controllers/CartController');


router.get('/delete/', middleware.checkAuthenticate(), cartController.deleteCart);

router.post('/add/:course_id', middleware.checkAuthenticate(), cartController.addCourseToCart);

module.exports = router;