module.exports = `\
import Todo from '~/models/todo'

export const getAll = async (req, res) => {
  try {
    const results = await Todo.find({})
    res.send(results)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

export const add = async (req, res) => {
  try {
    const newTodo = new Todo(req.body)
    await newTodo.save()
    res.send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    )

    if (!updated) {
      return res.status(400).send({ error: 'Could not find task to update' })
    }
    const newTodo = await Todo.findOne({ _id: req.params.id })
    res.send(newTodo)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

export const remove = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id })

    if (!deleted) {
      return res.status.send({ error: 'Could not find task to delete' })
    }
    res.send()
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

`
