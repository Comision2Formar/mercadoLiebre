var express = require('express');
var router = express.Router();

let controller = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/profile', controller.profile);

module.exports = router;
