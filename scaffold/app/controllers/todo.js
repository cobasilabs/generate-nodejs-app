module.exports = `\
const Todo = require('../models/todo')

const todoGet = async (req, res) => {
  try {
    const results = await Todo.find({})
    res.send(results)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoPost = async (req, res) => {
  try {
    const newTodo = new Todo(req.body)
    await newTodo.save()
    res.send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoPatch = async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    )

    if (updated) {
      const newTodo = await Todo.findOne({ _id: req.params.id })
      res.send(newTodo)
    } else {
      throw Error('Could not find task to update')
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const todoDelete = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id })

    if (deleted) {
      res.send()
    } else {
      throw Error('Could not find task to delete')
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  todoGet,
  todoPost,
  todoPatch,
  todoDelete
}
`
