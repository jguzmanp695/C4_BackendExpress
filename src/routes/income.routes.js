const express = require('express')
const router = express.Router()
const incomeController = require('../controllers/income.controller')
const { check } = require('express-validator')

/**
 * @api
 * @apiName
 * @apiGroup
 */
router.post('/', incomeController.add)
router.get('/', incomeController.list)
router.get('/:id', incomeController.find)


module.exports = router