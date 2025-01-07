var express = require('express');
var router = express.Router();
const CC = require('../controller/categoryController')

router.post('/addCategory', CC.createCategory)
router.get('/getCategory', CC.getCategory)
module.exports = router;
