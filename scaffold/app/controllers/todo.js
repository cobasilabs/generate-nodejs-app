module.exports = `\
const Todo = require('../models/todo')
const {
  todoSearch,
  todoCreate,
  todoEdit,
  todoReplace,
  todoRemove
} = require('../services/todo')

const todoGet = async (req, res) => {
  try {
    const { query, order, limit, page } = _parseSearchParams(req.query)
    const results = await todoSearch(query, { order, limit, page }) 
    res.send(results)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoPost = async (req, res) => {
  try {
    const newTodo = await todoCreate(req.body)
    res.status(201).send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoPatch = async (req, res) => {
  try {
    const { params, body } = req
    const newTodo = await todoEdit(params.id, body)
    res.send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoPut = async (req, res) => {
  try {
    const { params, body } = req
    const newTodo = await todoReplace(params.id, body)
    res.send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoDelete = async (req, res) => {
  try {
    const { params } = req
    const deleted = await todoRemove(params.id)
    res.send(deleted)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

function _parseSearchParams (queryParams) {
  let { query = '{}', order = 'name,asc', limit, page } = queryParams
  const [field = 'name', direction = 'asc'] = order.split(',')
  query = typeof query === 'string' ? JSON.parse(query) : query
  order = { [field]: direction }
  limit = limit ? Number(limit) : limit
  page = page ? Number(page) : page
  return { ...queryParams, query, order, limit, page }
}

module.exports = {
  todoGet,
  todoPost,
  todoPatch,
  todoPut,
  todoDelete
}
`
