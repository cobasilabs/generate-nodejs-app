module.exports = `\
import express from 'express'

import { getAll, add, remove, update } from '~/controllers/todo'

const router = express.Router()

router.get('/', getAll)
router.post('/', add)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router

`
