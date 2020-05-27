const express = require('express')
const passport = require('passport')
const controller = require('../controllers/submission.js')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id',  controller.getById)
router.delete('/:id', controller.remove)
router.post('/', upload.single('application'), controller.create)

module.exports = router