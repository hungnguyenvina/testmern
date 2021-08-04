var express = require('express');
const router = express.Router();
const GuestController = require('../controllers/GuestController');
const middleware = require('../middlewares/middleware');

router.post('/register', GuestController.register);
  
router.post('/login', GuestController.login);
  
router.get('/logout', middleware.checkAuthenticate(), GuestController.logout);
  

module.exports= router;