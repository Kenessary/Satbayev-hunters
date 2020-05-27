const express = require('express')
const passport = require('passport')
const controller = require('../controllers/commission.js')
const router = express.Router()

router.get('/', controller.getAllCommission)
router.get('/:id', controller.getByIdCommission)
router.patch('/:id',  controller.update)
router.delete('/:id', controller.remove)


module.exports = router 