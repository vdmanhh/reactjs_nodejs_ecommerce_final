const express = require('express')
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')
const {saveComment,getComments} = require('../controller/comment')
router.post('/save-comment',authCheck,saveComment)
router.post('/get-comment',getComments)
module.exports = router;