var express = require('express');
var router = express.Router();

let controller = require('../controllers/usersControllers');
let registerValidator = require('../validators/registerValidator');
let loginValidator = require('../validators/loginValidator');


router.get('/register',controller.register);
router.post('/register',registerValidator, controller.processRegister);

router.get('/login',controller.login);
router.post('/login',loginValidator, controller.processLogin);

router.get('/profile', controller.profile);

router.get('/logout',controller.logout);

module.exports = router;
