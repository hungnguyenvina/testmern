var express = require('express');
var router = express.Router();
const middleware = require('../middlewares/middleware');
const transactionController = require('../controllers/TransactionController');


router.post('/save_user_transaction',middleware.checkAuthenticate(), transactionController.saveUserTransaction);

module.exports = router;