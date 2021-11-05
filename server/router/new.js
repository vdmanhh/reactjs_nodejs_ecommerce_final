const express = require ('express')
const router = express.Router();
const {createNew,getNew,findNew} = require('../controller/new')
router.post('/post-new',createNew)
router.get('/get-new',getNew)
router.post('/find-new',findNew)
module.exports = router;