module.exports = `\
const express = require('express')
const todoController = require('../controllers/todo')
const router = express.Router()

router.get('/', todoController.todoGet)
router.post('/', todoController.todoPost)
router.patch('/:id', todoController.todoPatch)
router.delete('/:id', todoController.todoDelete)

module.exports = router
`
