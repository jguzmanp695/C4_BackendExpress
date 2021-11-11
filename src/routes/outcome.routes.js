const express = require('express')
const outcomeController = require('../controllers/outcome.controller')
const router = express.Router()


router.post('/', outcomeController.add)
router.post('/', outcomeController.list)
router.post('/:id', outcomeController.find)


module.exports = router